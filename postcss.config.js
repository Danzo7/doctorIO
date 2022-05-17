const autoprefixer = require('autoprefixer');
const color_rgba_fallback = require('postcss-color-rgba-fallback');
const opacity = require('postcss-opacity');
const pseudoelements = require('postcss-pseudoelements');
const vmin = require('postcss-vmin');
const pixrem = require('pixrem');
const will_change = require('postcss-will-change');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const mode = process.env.mode;
module.exports = {
  syntax: 'postcss-scss',
  plugins:
    mode === 'development'
      ? [tailwindcss]
      : [
          will_change,
          tailwindcss,
          autoprefixer,
          color_rgba_fallback,
          opacity,
          //  pseudoelements,
          vmin,
          pixrem,
          cssnano,
        ],
};
