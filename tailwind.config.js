module.exports = {
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: '599px',
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-grid')({
      grids: [2, 3, 4, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        3: '0.5rem',
        4: '1rem',
        8: '2rem',
        '4-x': '1rem',
        '4-y': '1rem',
      },
      autoMinWidths: {
        '16': '4rem',
        '24': '6rem',
        '300px': '300px',
      },
      variants: ['responsive'],
    }),
  ],
};
