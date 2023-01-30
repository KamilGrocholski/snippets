// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // container: {
      //   screens: {
      //     lg: '64rem',
      //     md: '48rem'
      //   }
      // },
      width: {
        256: '64rem'
      },
      colors: {
        primary: colors.pink['700'],
        'base-100': "#333338",
        'base-200': "#202023",
        'base-300': "#0C0C0E",
        'neutral': colors.zinc['900'],
        error: colors.pink['900'],
        danger: colors.red['800']
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-delay": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-in-delay": "fade-in-delay 1s ease-out",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("@tailwindcss/forms")({
      strategy: 'class'
    })
  ],
};
