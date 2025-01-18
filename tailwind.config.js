/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "576px" },
      not_mobile: { min: "577px" },
      medium_mobile: { max: "768px" },
      tablet: { max: "992px" },
      desktop: { min: "993px" },
    },
  },
  plugins: [],
};
