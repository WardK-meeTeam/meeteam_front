
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}" // Next.js 프로젝트면 포함
    ],
    theme: {
      extend: {
        rotate: {
          'y-180': '180deg',
        },
      },
    },
    variants: {
      extend: {
        transform: ['hover'],
        rotate: ['hover'],
      },
    },
    plugins: [],
  }
  