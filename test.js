var sass = require('sass');

result = sass.renderSync({
  file: 'src/components/QueueItem/style/index.scss',
  includePaths: ['src/assets/styles'],
  outFile: 'style.css',
});
console.log(result.css.toString());
