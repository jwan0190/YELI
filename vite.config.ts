import { defineConfig, loadEnv, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { credentialsFromEnv, fetchBoard, type PinterestCredentials } from "./server/pinterestBoard";

const SITE_DESCRIPTION =
  "Wedding, event, real estate and portrait photography from Sydney — documented slowly, with film and patience.";

/** Canonical public URL; VITE_SITE_URL overrides it for staging builds. */
const DEFAULT_SITE_URL = "https://yeli.com.au";

/** Used only when no site URL is available at all, so previews still show an image. */
const FALLBACK_OG_IMAGE =
  "https://i.pinimg.com/1200x/83/62/4c/83624c741fff1a11be500291854259b6.jpg";

/** Same path the Netlify Function is served on in production (see public/_redirects). */
const PINTEREST_API_PATH = "/api/pinterest";

/**
 * Fills the link-preview placeholders in index.html. Social crawlers need an
 * absolute image URL; it is built from the site URL and served from /og-image.jpg.
 */
function socialMeta(siteUrl: string | undefined): Plugin {
  const base = siteUrl?.replace(/\/+$/, "") ?? "";
  const ogImage = base ? `${base}/og-image.jpg` : FALLBACK_OG_IMAGE;
  const replacements: Record<string, string> = {
    __DESCRIPTION__: SITE_DESCRIPTION,
    __OG_IMAGE__: ogImage,
    __SITE_URL__: base,
  };

  return {
    name: "yeli-social-meta",
    transformIndexHtml(html) {
      const filled = Object.entries(replacements).reduce(
        (out, [token, value]) => out.replaceAll(token, value),
        html,
      );
      // A relative og:url is invalid, so omit the tag until the site URL is configured.
      const ogUrlTag = /^[ \t]*<meta property="og:url"[^\n]*\n/m;
      return base ? filled : filled.replace(ogUrlTag, "");
    },
  };
}

/** Serves /api/pinterest from the dev and preview servers, mirroring the Netlify Function. */
function pinterestApi(credentials: PinterestCredentials): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url?.split("?")[0] !== PINTEREST_API_PATH) return next();
    fetchBoard(credentials)
      .then(({ library, source }) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("X-Pinterest-Source", source);
        res.end(JSON.stringify(library));
      })
      .catch((error: unknown) => {
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }));
      });
  };

  return {
    name: "yeli-pinterest-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ mode }) => {
  // The "" prefix loads every variable, including the server-only PINTEREST_* ones.
  // They are used here in Node only and never reach the browser bundle.
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [
      react(),
      socialMeta(env.VITE_SITE_URL || DEFAULT_SITE_URL),
      pinterestApi(credentialsFromEnv(env)),
    ],
  };
});
