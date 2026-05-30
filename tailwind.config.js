/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#4F4E52",
        "hero-bg": "#070b14",
        surface: "#454448",
        "surface-2": "#58575b",
        border: "#656468",
        accent: "#6366f1",
        "accent-light": "#818cf8",
        accent2: "#8b5cf6",
        muted: "#94a3b8",
        text: "#f1f5f9",
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
        "gradient-soft": "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.25)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
