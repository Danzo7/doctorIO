
const webpackConfig=require("../webpack.config")({mode:"development"})
module.exports = {
  webpackFinal: async (config) => {
    return   { ...config,
       resolve:{...config.resolve,
        alias:{
              ...webpackConfig.resolve.alias,
              ...config.resolve.alias}},
       module: { ...config.module,
                  rules: webpackConfig.module.rules }
    } },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  babel: async (options) => ({
    ...options,
    presets: [
      ['@emotion/babel-preset-css-prop'],
      ['@babel/preset-env', { shippedProposals: true, loose: true }],
      ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
      ['@babel/preset-typescript'],
    ],
  }),
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
    'storybook-dark-mode'
   // "@storybook/addon-postcss"
  ],
  "framework": "@storybook/react",
  "features": {
    emotionAlias: false,  // <----------------------------- here
  },
  "core": {
    "builder": "webpack5"
  }
}