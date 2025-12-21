/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#badffd',
          300: '#7cc2fb',
          400: '#38a2f7',
          500: '#0e85db',
          600: '#0563bb',
          700: '#06519b',
          800: '#0a457f',
          900: '#0e3b6a',
          950: '#092545',
          DEFAULT: '#0563bb',
        },
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

