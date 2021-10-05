/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: "/",
		src: "/dist",
	},
	routes: [
		{
			match: "routes",
			src: ".*",
			dest: "/index.html",
		},
	],
	plugins: [
		"@snowpack/plugin-dotenv",
		"@snowpack/plugin-svelte",
		"@snowpack/plugin-typescript",
	],
};
