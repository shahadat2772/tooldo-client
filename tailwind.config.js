module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        assignment12: {
          primary: "#CCFFBD",
          secondary: "#7ECA9C",
          accent: "#40394A",
          neutral: "#1C1427",
          info: "#9C9C9C",
          error: "#F87272",
          warning: "#FBBD23",
          "base-100": "#ffffff",
        },
      },

      "light",
    ],
  },
  plugins: [require("daisyui")],
};

// #F0A500
// #334756
// #082032
// #000000

// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//     daisyui: {
//       themes: [
//         {
//           assignment12: {
//             primary: "#0FCFEC",
//             secondary: "#19D3AE",
//             accent: "#3A4256",
//             neutral: "#3d4451",
//             error: "#F87272",
//             warning: "#FBBD23",
//             "base-100": "#ffffff",
//           },
//         },
//         "light",
//       ],
//     },
//   },
//   plugins: [require("daisyui")],
// };
