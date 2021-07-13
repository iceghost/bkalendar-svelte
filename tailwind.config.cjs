const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        ibm: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = config;
