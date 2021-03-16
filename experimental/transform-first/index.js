const fs = require('fs');
module.exports = function (_, options) {
  return {
    name: 'transform-first',
    async transform({ id, contents, isDev, fileExt }) {
      if (
        contents.match(
          /(?<=Object.defineProperty\()[a-zA-Z0-9_$]*(?=, "__esModule")/,
          'ga',
        )
      )
        throw new Error(contents);
    },
  };
};
