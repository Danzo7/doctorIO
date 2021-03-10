import svgr from '@svgr/core';
const fs = require('fs');
const path = require('path');
const contents = fs.readFileSync('./src/assets/svg/home.svg', 'utf-8');

const code = svgr
  .sync(contents, { icon: true }, { componentName: 'sa' })
  .replace('import * as React', 'import React');
console.log(
  require('@babel/core').transform(code, {
    presets: ['@babel/preset-react'],
  }),
);
