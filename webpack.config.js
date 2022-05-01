//launching .env
require('dotenv').config();
const path = require('path');
const tsconfig = require('./tsconfig.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = ({ mode } = { mode: process.env.mode }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';
  return {
    mode: mode,
    entry: ['./src/renderer/index.tsx'],
    output: {
      path: `${__dirname}/build/renderer`,
      publicPath: '/',
      filename: isProduction
        ? '[name].[contenthash:8].js'
        : isDevelopment && '[name].bundle.js',
      chunkFilename: isProduction
        ? '[name].[contenthash:8].chunk.js'
        : isDevelopment && '[name].chunk.js',
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
            },
            //   { loader: 'ts-loader' },disabled for now.(testing babel instead)
          ],
          exclude: /node_modules/,
        },
        ...[
          //SCSS files
          {
            test: /\.s(a|c)ss$/,
            sideEffects: true,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true, importLoaders: 1 },
              },

              isDevelopment && 'postcss-loader',

              { loader: 'sass-loader', options: { sourceMap: true } },
            ].filter(Boolean),
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

              isProduction && 'postcss-loader',

              { loader: 'sass-loader', options: { sourceMap: true } },
            ].filter(Boolean),
          },
        ],

        ...[
          //SVG
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
        ],

        {
          test: /\.png/,
          type: 'asset/resource',
        },
        {
          test: [/\.(woff|tff)$/],
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
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
      }),
    ],

    devServer: {
      static: path.resolve(__dirname, 'public'),
      liveReload: true,
      port: 4000,
      hot: true,
      historyApiFallback: true,
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    target: isDevelopment ? 'web' : 'browserslist',
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      nodeEnv: mode,
    },
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
