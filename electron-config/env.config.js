const webpack = require('webpack');

const mode = process.env.mode === 'development' ? 'development' : 'production';
const isDevelopment = process.env.mode === 'development';
const isProduction = process.env.mode === 'production';
const isElectron = process.env.platform === 'electron';

const definedVariables = new webpack.DefinePlugin({
  FROM_ELECTRON: JSON.stringify(isElectron),
  IS_DEV: isDevelopment,
});
module.exports = {
  mode,
  isDevelopment,
  isProduction,
  isElectron,
  definedVariables,
};
