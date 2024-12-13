/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        lalezar: "Lalezar",
        vazirmatn: "Vazirmatn",
      },
      colors: {
        brand: "#05668d",
        brandLite: "#33759C",
      },
    },
  },
  plugins: [],
};
