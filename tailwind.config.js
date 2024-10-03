module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths for your project
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
