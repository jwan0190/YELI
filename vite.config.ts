import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const SITE_DESCRIPTION =
  "Wedding, event, real estate and portrait photography from Sydney — documented slowly, with film and patience.";

/** Used when VITE_SITE_URL is not set, so previews still show an image. */
const FALLBACK_OG_IMAGE =
  "https://i.pinimg.com/1200x/83/62/4c/83624c741fff1a11be500291854259b6.jpg";

/**
 * Fills the link-preview placeholders in index.html. Social crawlers need an
 * absolute image URL, so set VITE_SITE_URL (e.g. https://yeli.studio) in .env
 * or in the host's build settings to serve /og-image.jpg from this site.
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
      return Object.entries(replacements).reduce(
        (out, [token, value]) => out.replaceAll(token, value),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), socialMeta(env.VITE_SITE_URL)],
  };
});
