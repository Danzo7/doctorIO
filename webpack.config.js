const path = require('path');
const webpack = require('webpack');
const tsconfig = require("./tsconfig.json");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = ({mode})=>{
return {
  mode: mode,
  entry: ['./src/rendered/index.tsx'],
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'index.js',
  },
  devtool:mode==="production"?"source-map":'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        sideEffects: true,

          use: [
           (()=>mode==="development"?"style-loader":MiniCssExtractPlugin.loader)(),
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
            "postcss-loader",
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
      },
      {
        test: /\.svg$/,
       // type: 'asset/inline',
        use: ['@svgr/webpack',"url-loader"]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js','.scss'],
    alias:{... aliasResolver({
      ...tsconfig.compilerOptions.paths,
      'styles': ['./src/rendered/assets/styles']
    })
    }
  },
 
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "public/favicon.ico",
      template: "public/index.html"
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new MiniCssExtractPlugin({
      filename: "dist/[name].css",
  }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'public'),
    liveReload: true,
    port: 4000,
    hot: true,
    historyApiFallback: true,
   // writeToDisk: true,
  },
  experiments: {
      // asset: true
     },
  target: mode === "development" ? "web" : "browserslist",
}
};
const aliasResolver = (alias) => {
  const resAlias={};
   Object.entries(alias).forEach(en => { 
     resAlias[en[0].replace("/*","")] = path.resolve(__dirname, en[1][0].replace("/*",""))
    });
   return resAlias;
 }