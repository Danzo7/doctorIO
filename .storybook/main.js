const webpackConfig = require('../webpack.config');
module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          ...config.resolve.alias,
        },
      },
      module: { ...config.module, rules: webpackConfig.module.rules },
    };
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    'storybook-dark-mode',

    // "@storybook/addon-postcss"
  ],
  framework: '@storybook/react',
  features: {
    emotionAlias: false,
  },
  core: {
    builder: 'webpack5',
  },
  experiments: {
    topLevelAwait: true,
  },
};
