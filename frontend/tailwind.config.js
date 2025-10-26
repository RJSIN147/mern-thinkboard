import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        autumn: {
          primary: "#A84B2A", // burnt orange
          "primary-focus": "#8d3f22",
          secondary: "#F6C29C", // soft peach
          accent: "#7B5E3A", // warm brown
          neutral: "#F7F3EE",
          "base-100": "#FFF8F2",
          info: "#6AA6D6",
          success: "#8FBF87",
          warning: "#E9A14A",
          error: "#D65A4A",
        },
      },
    ],
  },
};
