/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'amazon-orange-dark': '#E47911',
        'amazon-blue': '#232F3E',
        'amazon-text': '#0F1111',
        'amazon-text-light': '#565959',
        'amazon-red': '#B12704',
        'amazon-bg': '#F7F8F8',
        'amazon-border-light': '#D5D9D9',
        'amazon-footer-dark': '#232F3E'
      },
      fontFamily: {
        'amazon': ['"Amazon Ember"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        'amazon-xs': '11px',
        'amazon-sm': '12px',
        'amazon-base': '14px',
        'amazon-lg': '16px',
        'amazon-xl': '18px',
        'amazon-2xl': '20px',
        'amazon-3xl': '24px',
        'amazon-4xl': '32px'
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        '135': '33.75rem',
        '482': '30.125rem'
      },
      maxWidth: {
        'amazon': '1464px'
      },
      gridTemplateColumns: {
        'amazon-product': '538px 1fr',
        'amazon-included': '80px 1fr auto'
      }
    }
  },
  plugins: []
};






