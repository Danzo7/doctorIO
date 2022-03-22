module.exports = {
  packagerConfig: {
    // "asar": true,
    icon: './src/renderer/assets/icon/icon.ico',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Clinicord',
        setupIcon: './src/renderer/assets/icon/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './electron-config/webpack.main.config.js',
        renderer: {
          config: './electron-config/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/renderer/index.tsx',
              name: 'app',
            },
          ],
        },
      },
    ],
  ],
};
