/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-slate-200',
    'text-white',
    'bg-slate-800',
    'hover:bg-indigo-600',
    'hover:text-white',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'shadow-lg',
    'font-semibold',
    'font-normal'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        slate: '#1E293B',
        starlight: '#1e2a47',
        accent: '#3B82F6',
        faded: '#94A3B8',
      },
    },
  },
  plugins: [],
}







