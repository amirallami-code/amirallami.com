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
        // Brand colors
        brand: {
          primary: '#507dbb',
          secondary: '#45638b',
          light: '#f4f4f5',
          dark: '#0f172a',
          neutral: '#241c15',
          background: '#1f2937',
        },

        // Github section colors
        github: {
          dark: '#0d1116',
          light: '#fff',
          muted: '#3d444d',
          secondary: '#919895',
          accent: '#4493f8',
        },
      },
      fontFamily: {
        // Mona-sans
        "monasans-bold": ["monasans-bold", "sans-sarif"],
        "monasans-med": ["monasans-med", "sans-sarif"],
        // Firacode
        "firacode": ["firacode", "sans-sarif"],
        // Montserrat (Primary)
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

