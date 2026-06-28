/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",      // page background (light)
        foreground: "#111827",      // primary text (dark gray)
        gold: "#d4af37",            // keep gold accent if desired
        "card-bg": "#f9fafb",      // light card background
        "card-border": "#e5e7eb", // light border
      },
    },
  },
  plugins: [],
};
