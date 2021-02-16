"use strict";
exports.__esModule = true;
var svgr = require("@svgr/core");
var fs = require('fs');
var path = require('path');
var contents = fs.readFileSync('./src/assets/svg/home.svg', 'utf-8');
var code = svgr["default"]
    .sync(contents, { icon: true }, { componentName: 'svg' })
    .replace('import * as React', 'import React');
console.log(require('@babel/core').transform(code, {
    presets: ['@babel/preset-react']
}));
