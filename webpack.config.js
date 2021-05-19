const path = require('path');
const webpack = require('webpack');
const tsconfig = require("./tsconfig.json");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const aliasResolver = (alias) => {
  resAlias={};
  Object.entries(alias).forEach(en => { 
    resAlias[en[0].replace("/*","")] = path.resolve(__dirname, en[1][0].replace("/*",""))
   });
  return resAlias;
}
const snToVt = (alias) => {
  Object.entries(alias).forEach(en => { alias[en[0]] = path.resolve(__dirname, en[1]) });
  return alias;
}
module.exports = ({mode})=>{
const config={
  mode: mode,
  watch: mode==="development",
  entry: ['./src/index.tsx'],
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'app.min.js',
  },
  devtool: 'inline-source-map',
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
      'styles': ['./src/assets/styles']
    })
    }
  },
 
  plugins: [
    new HtmlWebpackPlugin({
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
    contentBase: path.resolve(__dirname, 'public'),
    liveReload: true,
    port: 1234,
    hot: true,
    historyApiFallback: true,
    writeToDisk: true,
  },
  experiments: {
      // asset: true
     },
  target: mode === "development" ? "web" : "browserslist",

}
console.log(JSON.stringify(config));

  return config;
};
