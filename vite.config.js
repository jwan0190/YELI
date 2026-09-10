import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
var SITE_DESCRIPTION = "Wedding, event, real estate and portrait photography from Sydney — documented slowly, with film and patience.";
/** Used when VITE_SITE_URL is not set, so previews still show an image. */
var FALLBACK_OG_IMAGE = "https://i.pinimg.com/1200x/83/62/4c/83624c741fff1a11be500291854259b6.jpg";
/**
 * Fills the link-preview placeholders in index.html. Social crawlers need an
 * absolute image URL, so set VITE_SITE_URL (e.g. https://yeli.studio) in .env
 * or in the host's build settings to serve /og-image.jpg from this site.
 */
function socialMeta(siteUrl) {
    var _a;
    var base = (_a = siteUrl === null || siteUrl === void 0 ? void 0 : siteUrl.replace(/\/+$/, "")) !== null && _a !== void 0 ? _a : "";
    var ogImage = base ? "".concat(base, "/og-image.jpg") : FALLBACK_OG_IMAGE;
    var replacements = {
        __DESCRIPTION__: SITE_DESCRIPTION,
        __OG_IMAGE__: ogImage,
        __SITE_URL__: base,
    };
    return {
        name: "yeli-social-meta",
        transformIndexHtml: function (html) {
            return Object.entries(replacements).reduce(function (out, _a) {
                var token = _a[0], value = _a[1];
                return out.replaceAll(token, value);
            }, html);
        },
    };
}
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), "VITE_");
    return {
        plugins: [react(), socialMeta(env.VITE_SITE_URL)],
    };
});
