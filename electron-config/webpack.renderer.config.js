const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = 'development';
const webpackDefault = require('../webpack.config')(mode);
rules.push(
  {
    test: /\.scss$/,
    sideEffects: true,

    use: [
      (() =>
        mode === 'development'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader)(),
      { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
      'postcss-loader',
      { loader: 'sass-loader', options: { sourceMap: true } },
    ],
  },
  {
    test: /\.svg$/,
    // type: 'asset/inline',
    use: ['@svgr/webpack', 'url-loader'],
  },
);

module.exports = {
  mode: webpackDefault.mode,
  devtool: webpackDefault.devtool,
  module: {
    rules: webpackDefault.module.rules,
  },
  plugins: [...plugins, ...webpackDefault.plugins],
  resolve: webpackDefault.resolve,
};
