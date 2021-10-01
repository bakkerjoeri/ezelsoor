/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-typescript',
  ],
};
