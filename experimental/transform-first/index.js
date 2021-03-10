module.exports = function (_, options) {
  return {
    name: 'transform-first',
    async transform({ id, contents, isDev, fileExt }) {
      if (fileExt === '.js') {
        return contents + ` first`;
      }
    },
  };
};
