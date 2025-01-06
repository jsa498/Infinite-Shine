/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9C27B0', // Purple color for primary elements
        'primary-light': '#BB86FC', // Lighter purple for hover states and accents
        'primary-dark': '#6A0080', // Darker purple for depth
        secondary: '#000000', // Pure black background
        'secondary-light': '#1A1A1A', // Slightly lighter black for cards and sections
        accent: '#FFFFFF', // White for accents and text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(156, 39, 176, 0.3)', // Purple glow effect
        'glow-lg': '0 0 30px rgba(156, 39, 176, 0.4)', // Larger purple glow
      },
    },
  },
  plugins: [],
} 