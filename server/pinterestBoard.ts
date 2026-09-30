/**
 * Reads the YELI Pinterest board and returns it in the images.json shape:
 *
 *   { "<section-slug>": { "<name>1": "https://…", "<name>2": { "url": "https://…", "cover": true } } }
 *
 * Two ways in, tried in order:
 *   1. The official Pinterest API v5, when PINTEREST_APP_ID and PINTEREST_APP_SECRET
 *      are set. Uses the Client Credentials grant, so no one ever has to log in:
 *      the app ID and secret are exchanged for a 30-day token, renewed automatically.
 *   2. The public endpoints the Pinterest website itself uses for logged-out
 *      visitors. Needs no setup, but is unofficial and could change without notice.
 *
 * Shared by the Netlify Function (production), the Vite dev server and the snapshot script.
 */

export const BOARD = { username: "wjxheidi", slug: "yeli" } as const;

/** A pin with this title (any capitalisation) becomes its section's cover. */
const COVER_TITLE = "cover";
const REQUEST_TIMEOUT_MS = 15_000;

export type ImageEntry = string | { url: string; cover: true };
export type BoardLibrary = Record<string, Record<string, ImageEntry>>;
export type BoardSource = "official-api" | "public-web";

export type PinterestCredentials = {
  appId?: string;
  appSecret?: string;
  /** Numeric board ID; looked up by name when omitted. */
  boardId?: string;
};

/** A section and its pins, already reduced to what the site needs. */
type SectionPhotos = {
  slug: string;
  photos: { url: string; isCover: boolean }[];
};

const isCoverTitle = (...titles: (string | null | undefined)[]) =>
  titles.some((title) => title?.trim().toLowerCase() === COVER_TITLE);

/** "boat-party" → "boatparty", matching the key style used so far. */
const keyPrefix = (slug: string) => slug.replace(/-/g, "");

/** Pinterest's own slug rule: lower case, spaces become dashes. "boat party" → "boat-party". */
const slugify = (name: string) => name.trim().toLowerCase().replace(/\s+/g, "-");

/**
 * Every Pinterest image size shares one file hash, so any size can be turned
 * back into the full-resolution "originals" address used everywhere else.
 */
const toOriginalUrl = (url: string) =>
  url.replace(/^(https:\/\/i\.pinimg\.com\/)[^/]+\//, "$1originals/");

function toLibrary(sections: SectionPhotos[]): BoardLibrary {
  const library: BoardLibrary = {};
  for (const { slug, photos } of sections) {
    const coverIndex = photos.findIndex((photo) => photo.isCover);
    const group: Record<string, ImageEntry> = {};
    photos.forEach(({ url }, idx) => {
      group[`${keyPrefix(slug)}${idx + 1}`] = idx === coverIndex ? { url, cover: true } : url;
    });
    library[slug] = group;
  }
  return library;
}

/* ------------------------------------------------------------------ */
/* 1. Official Pinterest API v5 (Client Credentials)                   */
/* ------------------------------------------------------------------ */

const API = "https://api.pinterest.com/v5";
/** The API allows up to 250 per page. */
const API_PAGE_SIZE = 250;
/** Renew a day early so a token never expires mid-request. */
const TOKEN_SAFETY_MS = 24 * 60 * 60 * 1000;

type ApiImage = { url?: string; width?: number | null; height?: number | null };
type ApiImageSizes = Partial<Record<"1200x" | "600x" | "400x300" | "150x150", ApiImage>>;
type ApiPin = {
  id?: string;
  title?: string | null;
  media?: {
    media_type?: string;
    images?: ApiImageSizes;
    cover_image_url?: string;
    items?: { images?: ApiImageSizes; cover_image_url?: string }[];
  };
};
type ApiSection = { id: string; name: string };
type ApiPage<T> = { items?: T[]; bookmark?: string | null };

/**
 * Cached per function instance; a cold start simply requests a new token.
 * Tied to the credentials that produced it, so a changed secret takes effect at once.
 */
let cachedToken: { value: string; expiresAt: number; credentialKey: string } | null = null;

async function getAccessToken(appId: string, appSecret: string): Promise<string> {
  const credentialKey = `${appId}:${appSecret}`;
  if (cachedToken && cachedToken.credentialKey === credentialKey && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }
  cachedToken = null;

  const response = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${appId}:${appSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "boards:read,pins:read" }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`token request returned HTTP ${response.status}: ${await response.text()}`);
  }
  const json = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error("token response had no access_token");

  const lifetimeMs = (json.expires_in ?? 0) * 1000;
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + Math.max(lifetimeMs - TOKEN_SAFETY_MS, 0),
    credentialKey,
  };
  return json.access_token;
}

async function apiGetAll<T>(path: string, token: string): Promise<T[]> {
  const items: T[] = [];
  let bookmark: string | null | undefined;
  do {
    const params = new URLSearchParams({ page_size: String(API_PAGE_SIZE) });
    if (bookmark) params.set("bookmark", bookmark);
    const response = await fetch(`${API}${path}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      // A revoked or expired token must not be reused on the next request.
      if (response.status === 401) cachedToken = null;
      throw new Error(`GET ${path} returned HTTP ${response.status}: ${await response.text()}`);
    }
    const page = (await response.json()) as ApiPage<T>;
    items.push(...(page.items ?? []));
    bookmark = page.bookmark;
  } while (bookmark);
  return items;
}

/** Largest still image of a pin: the photo itself, or a video's cover frame. */
function largestImage(pin: ApiPin): string | undefined {
  const media = pin.media;
  const fromSizes = (sizes?: ApiImageSizes) =>
    sizes?.["1200x"]?.url ?? sizes?.["600x"]?.url ?? sizes?.["400x300"]?.url ?? sizes?.["150x150"]?.url;
  const first = media?.items?.[0];
  return fromSizes(media?.images) ?? media?.cover_image_url ?? fromSizes(first?.images) ?? first?.cover_image_url;
}

async function findBoardId(token: string): Promise<string> {
  const boards = await apiGetAll<{ id: string; name: string }>("/boards", token);
  const match = boards.find((board) => slugify(board.name) === BOARD.slug);
  if (!match) throw new Error(`no board named "${BOARD.slug}" on this account`);
  return match.id;
}

async function fetchViaOfficialApi(credentials: Required<Pick<PinterestCredentials, "appId" | "appSecret">> & PinterestCredentials): Promise<BoardLibrary> {
  const token = await getAccessToken(credentials.appId, credentials.appSecret);
  const boardId = credentials.boardId || (await findBoardId(token));
  const sections = await apiGetAll<ApiSection>(`/boards/${boardId}/sections`, token);

  const withPhotos = await Promise.all(
    sections.map(async (section): Promise<SectionPhotos> => {
      const pins = await apiGetAll<ApiPin>(`/boards/${boardId}/sections/${section.id}/pins`, token);
      const photos = pins.flatMap((pin) => {
        const url = largestImage(pin);
        return url ? [{ url: toOriginalUrl(url), isCover: isCoverTitle(pin.title) }] : [];
      });
      return { slug: slugify(section.name), photos };
    }),
  );
  return toLibrary(withPhotos);
}

/* ------------------------------------------------------------------ */
/* 2. Public website endpoints (no credentials)                        */
/* ------------------------------------------------------------------ */

const WEB_HOST = "https://au.pinterest.com";
/** The website endpoints reject pages larger than 50. */
const WEB_PAGE_SIZE = 50;
const WEB_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "X-Pinterest-PWS-Handler": "www/[username]/[slug]/[section_slug].js",
};

type WebPin = { type?: string; title?: string; grid_title?: string; images?: { orig?: { url?: string } } };
type WebSection = { id: string; slug: string };

async function webResource<T>(
  name: string,
  options: Record<string, unknown>,
  sourceUrl: string,
): Promise<{ data: T | undefined; bookmark: string | undefined }> {
  const data = encodeURIComponent(JSON.stringify({ options, context: {} }));
  const url = `${WEB_HOST}/resource/${name}/get/?source_url=${encodeURIComponent(sourceUrl)}&data=${data}`;
  const response = await fetch(url, { headers: WEB_HEADERS, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`${name} returned HTTP ${response.status}`);
  const json = (await response.json()) as { resource_response?: { data?: T; bookmark?: string } };
  return { data: json.resource_response?.data, bookmark: json.resource_response?.bookmark };
}

async function fetchWebSectionPins(section: WebSection): Promise<WebPin[]> {
  const sourceUrl = `/${BOARD.username}/${BOARD.slug}/${section.slug}/`;
  const pins: WebPin[] = [];
  let bookmark: string | undefined;
  do {
    const options: Record<string, unknown> = { section_id: section.id, page_size: WEB_PAGE_SIZE };
    if (bookmark) options.bookmarks = [bookmark];
    const page = await webResource<WebPin[]>("BoardSectionPinsResource", options, sourceUrl);
    pins.push(...(page.data ?? []).filter((pin) => pin?.type === "pin" && pin.images?.orig?.url));
    bookmark = page.bookmark;
  } while (bookmark && bookmark !== "-end-");
  return pins;
}

async function fetchViaPublicWeb(): Promise<BoardLibrary> {
  const boardPath = `/${BOARD.username}/${BOARD.slug}/`;
  const { data: board } = await webResource<{ id?: string }>("BoardResource", { ...BOARD }, boardPath);
  if (!board?.id) throw new Error("Pinterest board not found or not public");

  const { data: sections } = await webResource<WebSection[]>(
    "BoardSectionsResource",
    { board_id: board.id, page_size: WEB_PAGE_SIZE },
    boardPath,
  );

  const withPhotos = await Promise.all(
    (sections ?? []).map(async (section): Promise<SectionPhotos> => {
      const pins = await fetchWebSectionPins(section);
      return {
        slug: section.slug,
        photos: pins.map((pin) => ({
          url: pin.images?.orig?.url as string,
          isCover: isCoverTitle(pin.title, pin.grid_title),
        })),
      };
    }),
  );
  return toLibrary(withPhotos);
}

/* ------------------------------------------------------------------ */

/**
 * Fetches every section of the board, in board order. Uses the official API
 * when credentials are available and falls back to the public endpoints if it
 * is not configured or fails.
 */
export async function fetchBoard(
  credentials: PinterestCredentials = {},
): Promise<{ library: BoardLibrary; source: BoardSource }> {
  const { appId, appSecret } = credentials;
  if (appId && appSecret) {
    try {
      return { library: await fetchViaOfficialApi({ ...credentials, appId, appSecret }), source: "official-api" };
    } catch (error) {
      console.warn(`Pinterest official API failed, using public endpoints: ${(error as Error).message}`);
    }
  }
  return { library: await fetchViaPublicWeb(), source: "public-web" };
}

/** Reads credentials from environment variables (Netlify, .env, shell). */
export function credentialsFromEnv(env: Record<string, string | undefined>): PinterestCredentials {
  return {
    appId: env.PINTEREST_APP_ID?.trim() || undefined,
    appSecret: env.PINTEREST_APP_SECRET?.trim() || undefined,
    boardId: env.PINTEREST_BOARD_ID?.trim() || undefined,
  };
}
