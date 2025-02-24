/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'btn': '-5px 4px 0px 0px #241c15',
      },
      colors: {
        primary: '#507dbb',
        priBlue: '#45638b',
        priWhite: '#f4f4f5',
        priBlack: '#0f172a',
        priGray: '#241c15',

        // Github section color
        gitBlack: '#0d1116',
        gitWhite: '#fff',
        gitGray: '#3d444d',
        gitBlue: '#4493f8',

        dark: {
          primary: '#1e3a8a',
          backGround: '#1f2937',
        },
      },
      fontFamily: {
        "firacode": ["firacode", "sans-sarif"],
        "mont-light": ["montserrat-light", "sans-sarif"],
        "mont-med": ["montserrat-med", "sans-sarif"],
        "mont-semibold": ["montserrat-semibold", "sans-sarif"],
        "mont-bold": ["montserrat-bold", "sans-sarif"],
        "mont-exbold": ["montserrat-extrabold", "sans-sarif"],
      },
      zIndex: {
        '1': '1',
      },
    },
  },
  plugins: [],
}

