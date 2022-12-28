//launching .env
require('dotenv').config();
const path = require('path');
const tsconfig = require('./tsconfig.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {
  mode,
  isDevelopment,
  isProduction,
  definedVariables,
  isElectron,
} = require('./electron-config/env.config');

const aliasResolver = (alias) => {
  const resAlias = {};
  Object.entries(alias).forEach((en) => {
    resAlias[en[0].replace('/*', '')] = path.resolve(
      __dirname,
      en[1][0].replace('/*', ''),
    );
  });
  return resAlias;
};

module.exports = {
  mode: mode,
  entry: ['./src/renderer/index.tsx'],
  output: {
    path: `${__dirname}/build/renderer`,
    publicPath: '/',
    filename: isProduction ? '[name].[contenthash:8].js' : '[name].bundle.js',
    chunkFilename: isProduction
      ? '[name].[contenthash:8].chunk.js'
      : '[name].chunk.js',
    assetModuleFilename: 'assets/[contenthash][ext][query]',
  },
  module: {
    rules: [
      //Type Script
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
          //   { loader: 'ts-loader' },disabled for now.(testing babel instead)
        ],
        exclude: /node_modules/,
      },
      //scss|sass file rules
      ...[
        //SCSS files
        //load sass files and ignore module extension
        {
          test: /\.s?(a|c)ss$/,
          sideEffects: true,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 },
            },

            'postcss-loader',

            { loader: 'sass-loader', options: { sourceMap: true } },
          ].filter(Boolean),
        },
        //module style files
        //load module style files only
        {
          test: /\.module\.s(a|c)ss$/,
          sideEffects: true,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1, modules: true },
            },

            'postcss-loader',

            { loader: 'sass-loader', options: { sourceMap: true } },
          ].filter(Boolean),
        },
      ],
      //SVG rules

      ...[
        //load *.svg?url as svg file
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg ?url
        },

        //load *.svg as react components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/, // only work ib jsx/tsx file
          resourceQuery: { not: [/url/, /icon/] },
          use: ['@svgr/webpack'],
        },
        //load *.svg?icon as react components with viewbox.

        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: /icon/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
              },
            },
          ],
        },
      ],

      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.mp3/,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[contenthash][ext][query]',
        },
      },
      {
        test: [/\.(woff|ttf)$/],
        type: 'asset/resource',
        generator: {
          filename: 'font/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      ...aliasResolver({
        ...tsconfig.compilerOptions.paths,
        styles: ['./src/renderer/assets/styles'],
        font: ['./src/renderer/assets/font'],
        icon: ['./src/renderer/assets/icon'],
      }),
    },
  },

  plugins: [
    //Ts error
    isDevelopment && new ForkTsCheckerWebpackPlugin(),
    definedVariables,
    new HtmlWebpackPlugin({
      favicon: 'public/favicon.ico',
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    ,
    isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
  ].filter(Boolean),

  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 4000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  target: isDevelopment ? 'web' : 'browserslist',
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    nodeEnv: mode,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  experiments: {
    topLevelAwait: true,
  },
};
