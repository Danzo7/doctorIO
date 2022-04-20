//launching .env
require('dotenv').config();
const path = require('path');
const tsconfig = require('./tsconfig.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ mode } = { mode: process.env.mode }) => {
  const isDevelopment = mode === 'development';
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
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 },
            },

            mode !== 'development' ? 'postcss-loader' : undefined,

            { loader: 'sass-loader', options: { sourceMap: true } },
          ].filter((r) => r != undefined),
        },
        {
          test: /\.module\.s(a|c)ss$/,
          sideEffects: true,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1, modules: true },
            },

            !isDevelopment ? 'postcss-loader' : undefined,

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
          resourceQuery: { not: [/url/, /icon/] },
          use: ['@svgr/webpack'],
        },
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
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
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
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    target: isDevelopment ? 'web' : 'browserslist',
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
