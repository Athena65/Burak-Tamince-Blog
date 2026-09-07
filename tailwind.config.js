/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ground: petrol-ink, deliberately chromatic (not tinted black)
        ink: {
          DEFAULT: '#0A1418',
          2: '#0E1B21',
          3: '#132630',
        },
        // Structure: hairlines and dividers
        rule: {
          DEFAULT: '#1E3843',
          soft: '#16303A',
          strong: '#2A4C5A',
        },
        // Text
        paper: {
          DEFAULT: '#E6EFF1',
          dim: '#A3B5BB',
          mute: '#6E8590',
        },
        // Primary accent: İznik/çini turquoise — interaction, active state, links
        accent: {
          50: '#EAFBF9',
          100: '#CDF5F0',
          200: '#9EEAE2',
          300: '#67D9CF',
          400: '#3ECBC0',
          500: '#2EC4B6',
          600: '#1FA398',
          700: '#1B837B',
          800: '#186860',
          900: '#14514C',
          950: '#0A2F2C',
          DEFAULT: '#2EC4B6',
        },
        // Secondary accent: brass — data values (dates, tenure, levels, counts)
        brass: {
          50: '#FBF6EA',
          100: '#F5E9C8',
          200: '#EED79C',
          300: '#E8C77A',
          400: '#E4B363',
          500: '#D9A24A',
          600: '#B98430',
          700: '#946727',
          800: '#755123',
          900: '#5E421F',
          DEFAULT: '#E4B363',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        heading: ['Archivo', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        nav: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        measure: '62ch',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [
    // Archivo is a variable font with a width axis (62–125). Use it as the display voice.
    function ({ addUtilities }) {
      addUtilities({
        '.stretch-narrow': { fontStretch: '88%' },
        '.stretch-normal': { fontStretch: '100%' },
        '.stretch-wide': { fontStretch: '112%' },
        '.stretch-xwide': { fontStretch: '125%' },
      })
    },
  ],
}
