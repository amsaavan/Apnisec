import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#0f172a",    // Slate 900
          card: "#1e293b",    // Slate 800
          primary: "#10b981", // Emerald 500
          hover: "#059669",   // Emerald 600
          text: "#e2e8f0",    // Slate 200
          muted: "#94a3b8",   // Slate 400
        },
      },
      backgroundImage: {
        'hero-glow': "radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
      }
    },
  },
  plugins: [],
};
export default config;