import { credentialsFromEnv, fetchBoard } from "../../server/pinterestBoard";

/**
 * GET /api/pinterest → the live board as images.json-shaped JSON.
 *
 * Uses the official Pinterest API when PINTEREST_APP_ID and PINTEREST_APP_SECRET
 * are set in Netlify's environment variables; otherwise the public endpoints.
 * The X-Pinterest-Source response header says which one answered.
 *
 * Netlify's CDN caches the response so Pinterest isn't hit on every page view;
 * once it goes stale the next visitor still gets the cached copy instantly
 * while a fresh one is fetched in the background.
 *
 * Budget: Pinterest Trial apps get 1,000 API calls a day, and one refresh costs
 * about 1 + (number of sections) calls. Refreshing at most every 30 minutes
 * means ≤ 48 refreshes a day (~400 calls with 7 sections). "durable" makes all
 * Netlify edge locations share one cached copy instead of each fetching its own.
 */
const CDN_FRESH_SECONDS = 1800;
const CDN_STALE_SECONDS = 86_400;

export default async function handler(): Promise<Response> {
  try {
    const { library, source } = await fetchBoard(credentialsFromEnv(process.env));
    return new Response(JSON.stringify(library), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Netlify-CDN-Cache-Control": `public, durable, max-age=${CDN_FRESH_SECONDS}, stale-while-revalidate=${CDN_STALE_SECONDS}`,
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
