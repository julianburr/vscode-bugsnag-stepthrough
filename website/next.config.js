/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "vscode-bugsnag-stepthrough-components",
]);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,

  webpack: (config) => {
    // SVG loader to turn imported SVGs into React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
});
