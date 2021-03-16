const fs = require('fs');
module.exports = function (_, options) {
  return {
    resolve: {
      input: ['.svgr.svg'],
      output: ['.svg'],
    },
    name: 'transform-second',
    async load({ filePath }) {
      const contents = fs.readFileSync(filePath, 'utf-8');
      return 's';
    },
  };
};
