/** @type {import('https://esm.sh/tailwindcss@3.1.8').Config} */
module.exports = {
  content: ["./routes/**/*.{tsx,ts}", "./islands/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}"],
  theme: {
    extend: {},
  },
  // daisy UI config
  // daisyui: {
  //   styled: true,
  //   themes: true,
  //   base: true,
  //   utils: true,
  //   logs: true,
  //   rtl: false,
  //   prefix: "",
  //   darkTheme: "dark",
  // },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
