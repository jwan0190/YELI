/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        line: "var(--line)",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Times New Roman"', "serif"],
        sans: ['"Inter"', '"Helvetica Neue"', "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
        meta: "0.25em",
        brand: "0.35em",
      },
      maxWidth: {
        section: "1500px",
        gallery: "1600px",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
};
