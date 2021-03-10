module.exports = function (_, options) {
  return {
    name: 'transform-second',
    async transform({ id, contents, isDev, fileExt }) {
      if (fileExt === '.js') {
        return contents + ` second`;
      }
    },
  };
};
