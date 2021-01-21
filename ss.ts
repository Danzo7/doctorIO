const fs = require('fs');
const path = require('path');
const execa = require('execa');
const npmRunPath = require('npm-run-path');
const sass = require('node-sass');
function resolveAfter1Second() {
  console.log('starting fast promise');
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve('fast');
      console.log('fast promise is done');
    }, 1000);
  });
}
const slow = await resolveAfter2Seconds();
let result: string = sass.renderSync(
  {
    file: 'src/App.scss',
    includePaths: ['src/assets/styles'],
    outFile: 'src/style.css',
  },
  (err, res) => {
    console.log(err);
  },
);
