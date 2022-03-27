const webpackDefault = require('../webpack.config')();
module.exports = {
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  mode: webpackDefault.mode,
  devtool: webpackDefault.devtool,
  module: webpackDefault.module,
  plugins: webpackDefault.plugins,
  resolve: webpackDefault.resolve,
};
