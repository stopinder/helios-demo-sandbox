/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        slate: '#1E293B',
        starlight: '#1e2a47', // must be here
        accent: '#3B82F6',
        faded: '#94A3B8',
      },
    },

  },
  plugins: [],
}






