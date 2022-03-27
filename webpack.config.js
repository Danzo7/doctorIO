//launching .env
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const tsconfig = require('./tsconfig.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ mode } = { mode: process.env.mode }) => {
  return {
    mode: mode,
    entry: ['./src/renderer/index.tsx'],
    output: {
      path: `${__dirname}/build/renderer`,
      publicPath: '/',
      filename: 'index.js',
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
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
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 },
            },

            mode !== 'development' ? 'postcss-loader' : undefined,

            { loader: 'sass-loader', options: { sourceMap: true } },
          ].filter((r) => r != undefined),
        },
        {
          test: [/\.(woff|tff)$/],
          type: 'asset/resource',
          generator: {
            filename: '/font/[name][ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg ?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/, // only work ib jsx/tsx file
          resourceQuery: { not: [/url/] },
          use: ['@svgr/webpack'],
        },
        {
          test: /\.png/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
      alias: {
        ...aliasResolver({
          ...tsconfig.compilerOptions.paths,
          styles: ['./src/renderer/assets/styles'],
          icon: ['./src/renderer/assets/icon'],
        }),
      },
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin(),

      new HtmlWebpackPlugin({
        favicon: 'public/favicon.ico',
        template: 'public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css',
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
    devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
    target: mode === 'development' ? 'web' : 'browserslist',
  };
};
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
