let mode="development";

const webpackDefault=require('../webpack.config')(mode);


module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
//  output: webpackDefault.output,
  mode:webpackDefault.mode,
  
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
   
  },
 // devServer:webpackDefault.devServer,
 // devtool:webpackDefault.devtool,
 // target:webpackDefault.target
};
