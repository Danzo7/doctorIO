const webpackDefault = require('../webpack.config')();
module.exports = {
  mode: webpackDefault.mode,
  devtool: webpackDefault.devtool,
  module: webpackDefault.module,
  plugins: webpackDefault.plugins,
  resolve: webpackDefault.resolve,
};
