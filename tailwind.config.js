/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    'bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-300',
    'bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300',
    'bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900', 'dark:text-yellow-300'
  ],
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
        gitDarkGray: '#3d444d',
        gitGray: '#919895',
        gitBlue: '#4493f8',

        dark: {
          primary: '#1e3a8a',
          backGround: '#1f2937',
        },
      },
      fontFamily: {
        "monasans-bold": ["monasans-bold", "sans-sarif"],
        "monasans-med": ["monasans-med", "sans-sarif"],
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
};

