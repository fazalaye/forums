/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0ff",
          100: "#e6e1ff",
          200: "#cabdff",
          300: "#a894ff",
          400: "#8a66ff",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#3b1578",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f59e0b 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(219,39,119,0.15) 50%, rgba(245,158,11,0.15) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        glow: "0 0 40px rgba(124, 58, 237, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
