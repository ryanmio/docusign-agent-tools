/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        docusign: {
          purple: {
            DEFAULT: '#4C00FF',
            dark: '#26065D',
            light: '#CBC2FF'
          }
        }
      }
    }
  },
  plugins: []
} 