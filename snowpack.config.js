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
        aliasPrefix: '@',
        compilerOptions: {
          outputStyle: 'compressed',
          includePaths: ['src/assets/styles'],
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
    '@styles': './src/assets/styles',
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
