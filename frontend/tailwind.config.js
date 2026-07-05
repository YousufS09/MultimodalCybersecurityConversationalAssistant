/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.15), 0 20px 80px rgba(8, 47, 73, 0.45)",
      },
      backgroundImage: {
        "cyber-grid":
          "radial-gradient(circle at 1px 1px, rgba(125, 211, 252, 0.14) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

