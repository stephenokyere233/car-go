/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./App.{js,jsx,ts,tsx}",
    // "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    // ".app/<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/index.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
