const { withFaust } = require("@faustjs/next");

/**
 * @type {import('next').NextConfig}
 **/

const webpack = require("webpack");
module.exports = withFaust({
  trailingSlashes: undefined,
  images: {
    domains: ["myriadsolutionz.com", "localhost"],
  },
  staticPageGenerationTimeout: 1000,
});
