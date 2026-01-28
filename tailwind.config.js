/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // This line ensures all .vue files in /src/ are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
