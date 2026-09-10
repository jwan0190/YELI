import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
const SITE_DESCRIPTION = "Wedding, event, real estate and portrait photography from Sydney — documented slowly, with film and patience.";
/** Canonical public URL; VITE_SITE_URL overrides it for staging builds. */
const DEFAULT_SITE_URL = "https://yeli.com.au";
/** Used only when no site URL is available at all, so previews still show an image. */
const FALLBACK_OG_IMAGE = "https://i.pinimg.com/1200x/83/62/4c/83624c741fff1a11be500291854259b6.jpg";
/**
 * Fills the link-preview placeholders in index.html. Social crawlers need an
 * absolute image URL; it is built from the site URL and served from /og-image.jpg.
 */
function socialMeta(siteUrl) {
    const base = siteUrl?.replace(/\/+$/, "") ?? "";
    const ogImage = base ? `${base}/og-image.jpg` : FALLBACK_OG_IMAGE;
    const replacements = {
        __DESCRIPTION__: SITE_DESCRIPTION,
        __OG_IMAGE__: ogImage,
        __SITE_URL__: base,
    };
    return {
        name: "yeli-social-meta",
        transformIndexHtml(html) {
            const filled = Object.entries(replacements).reduce((out, [token, value]) => out.replaceAll(token, value), html);
            // A relative og:url is invalid, so omit the tag until the site URL is configured.
            const ogUrlTag = /^[ \t]*<meta property="og:url"[^\n]*\n/m;
            return base ? filled : filled.replace(ogUrlTag, "");
        },
    };
}
export default defineConfig(({ mode }) => {
    // "." resolves against the directory Vite was started from, so no Node types are needed.
    const env = loadEnv(mode, ".", "VITE_");
    return {
        plugins: [react(), socialMeta(env.VITE_SITE_URL || DEFAULT_SITE_URL)],
    };
});
