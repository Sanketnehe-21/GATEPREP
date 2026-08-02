// tailwind.config.cjs
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0B0F17",
        card: "#1E293B",
        border: "#334155",
        night: "#6366F1",
        office: "#10B981",
        weekend: "#F59E0B",
      },
    },
  },
  plugins: [],
};
