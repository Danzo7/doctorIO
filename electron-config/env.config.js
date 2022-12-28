const webpack = require('webpack');

const mode = process.env.mode === 'development' ? 'development' : 'production';
const isDevelopment = process.env.mode === 'development';
const isProduction = process.env.mode === 'production';
const isElectron = process.env.platform === 'electron';
const isTauri = process.env.platform === 'tauri';

const definedVariables = new webpack.DefinePlugin({
  FROM_ELECTRON: JSON.stringify(isElectron),
  FROM_TAURI: JSON.stringify(isTauri),
  IS_DEV: JSON.stringify(isDevelopment),
  IS_DESKTOP: JSON.stringify(isElectron || isTauri),
});
module.exports = {
  mode,
  isDevelopment,
  isProduction,
  isElectron,
  definedVariables,
  isTauri,
};
