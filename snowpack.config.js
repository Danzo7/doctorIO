/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',

    [
      'snowpack-svgr-plugin',
      {
        include: './src/assets/svg/render',
      },
    ],
    //'@snowpack/plugin-postcss',
    [
      'snowpack-sass-compiler',
      {
        useAlias: true,
        alias:"~",
        compilerOptions: {
          includePaths: ['src/assets/styles', 'node-module/bootstrap'],
        },
      },
    ],
    /* [
      '@snowpack/plugin-sass',
      { compilerOptions: { loadPath: ['src/assets/styles'] } },
    ], */
  ],

  alias: {
    '@data': './src/data',
    '@components': './src/components/components',
    '@containers': './src/components/containers',
    toSvg: './src/assets/svg',
    '@assets': './src/assets',
    '~styles': './src/assets/styles',
    bootstrap: './node_modules/bootstrap',
  },
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    //bundle: true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
