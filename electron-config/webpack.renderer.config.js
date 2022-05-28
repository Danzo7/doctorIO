const webpackDefault = require('../webpack.config')();
const webpack = require('webpack');

module.exports = {
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  mode: webpackDefault.mode,
  devtool: webpackDefault.devtool,
  module: webpackDefault.module,
  plugins: [
    new webpack.DefinePlugin({
      //Setting environment variables
      ELECTRON_ROUTING: JSON.stringify(true),
    }),
    ...webpackDefault.plugins,
  ],
  resolve: webpackDefault.resolve,
};
