/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0563bb',
        heading: '#45505b',
        default: '#272829',
        nav: '#45505b',
        'nav-hover': '#0563bb',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        nav: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'main-bg': "url('/assets/img/mainbg.webp')",
        'hero-bg': "url('/assets/img/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
}

