/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#723FEB',
        accent: '#97E0F7',
        light: '#FCFCFC',
        primary2: '#252525',
        primary3: '#212121',
        primary4: '#181818',
        grey: {
          shade1: '#CDCECE',
          shade2: '#3d3d3d',
          shade3: '#A6A6A6',
          shade4: '#2C2F30',
        },
        green: '#3BA971',
        yellow: '#FBED74',
        greyLightBg: '#fcfcfc',
        orange: '#E89E59',
        pink: '#DB7E9F',
        black: '#DB7E9F',
      },
      fontFamily: {
        regular: ['Manrope-Regular', 'sans-serif'],
        bold: ['Manrope-Bold', 'sans-serif'],
        extraBold: ['Manrope-ExtraBold', 'sans-serif'],
        extraLight: ['Manrope-ExtraLight', 'sans-serif'],
        light: ['Manrope-Light', 'sans-serif'],
        medium: ['Manrope-Medium', 'sans-serif'],
        semiBold: ['Manrope-SemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
