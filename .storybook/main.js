const path = require('path');

const snToVt = (alias) => {
  Object.entries(alias).forEach(en => { alias[en[0]] = path.resolve(__dirname, en[1]) });
  return alias;
}
module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...snToVt({
            '@data': './src/data',
            '@components': './src/components/components',
            '@containers': './src/components/containers',
            toSvg: './src/assets/svg',
            '@assets': './src/assets',
            'styles': './src/assets/styles',
            bootstrap: './node_modules/bootstrap',
          })
        },
      },
    };
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss'
  ]
}

