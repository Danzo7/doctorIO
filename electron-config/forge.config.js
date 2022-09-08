process.env;
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
        exe: 'clinicord.exe',

        iconUrl:
          'https://raw.githubusercontent.com/Danzo7/doctorIO/master/src/renderer/assets/icon/icon.ico',
        setupIcon: './src/renderer/assets/icon/icon.ico',
      },
    },
  ],
  plugins: [
    [
      'electron-wp',
      {
        output: 'build',
        mainConfig: './electron-config/webpack.main.config.js',
        devContentSecurityPolicy: `default-src * 'self' 'unsafe-inline' data:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' data:`,

        renderer: {
          config: './electron-config/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/renderer/index.tsx',
              name: 'app',
              isMain: true,
              preload: {
                js: './src/main/preload.ts',
              },
            },
          ],
        },
      },
    ],
  ],
};
