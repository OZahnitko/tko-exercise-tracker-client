const { resolve } = require("path");

const PATH_ALIASES = require("./config/build/PATH_ALIASES.json");

const config = {
  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: PATH_ALIASES.reduce(
          (acc, { name, path }) => ({
            ...acc,
            [name]: resolve(__dirname, `src/${path}`),
          }),
          {}
        ),
      },
    };
  },
};

module.exports = config;
