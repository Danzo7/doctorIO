
const path = require("path");
const webpackConfig=require("../webpack.config")({mode:"development"})
console.log(webpackConfig.resolve.alias);

module.exports = {
  webpackFinal: async (config) => {
    console.log(config);


    
    config.module.rules=[
      {
        test: /\.svg$/,
       // type: 'asset/inline',
        use: ['@svgr/webpack',"url-loader"]
      },

      ...config.module.rules,
    
   //   ...webpackConfig.module.rules
    ];

    config.resolve.alias ={
      ...webpackConfig.resolve.alias,
      ...config.resolve.alias
    };
    return config;
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/preset-scss',
    'storybook-dark-mode'
   // "@storybook/addon-postcss"
  ],
  "core": {
    "builder": "webpack5"
  }
}