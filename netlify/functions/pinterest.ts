import { credentialsFromEnv, fetchBoard } from "../../server/pinterestBoard";

/**
 * GET /api/pinterest → the live board as images.json-shaped JSON.
 *
 * Uses the official Pinterest API when PINTEREST_APP_ID and PINTEREST_APP_SECRET
 * are set in Netlify's environment variables; otherwise the public endpoints.
 * The X-Pinterest-Source response header says which one answered.
 *
 * Netlify's CDN caches the response for a few minutes so Pinterest isn't hit on
 * every page view; after that the next visitor gets the cached copy instantly
 * while a fresh one is fetched in the background.
 */
const CDN_FRESH_SECONDS = 300;
const CDN_STALE_SECONDS = 86_400;

export default async function handler(): Promise<Response> {
  try {
    const { library, source } = await fetchBoard(credentialsFromEnv(process.env));
    return new Response(JSON.stringify(library), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Netlify-CDN-Cache-Control": `public, max-age=${CDN_FRESH_SECONDS}, stale-while-revalidate=${CDN_STALE_SECONDS}`,
        "X-Pinterest-Source": source,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
}
