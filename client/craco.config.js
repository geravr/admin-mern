const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./src",
        aliases: {
          // Files
          "@mock-server": "./mocks/server.js",
          // folder aliases
          "@components": "./components",
          "@config": "./config",
          "@hooks": "./hooks",
          "@layout": "./layout",
          "@pages": "./pages",
          "@utils": "./utils",
          "@services": "./services",
        },
      },
    },
  ],
};
