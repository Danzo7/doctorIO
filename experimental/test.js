const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const svgr = require('@svgr/core').default;

module.exports = function ({ root, mount }, { include, exclude }) {
  function includes(file, folder) {
    return file.includes(folder);
  }

  function writeFileSyncRecursive(filename, content, charset) {
    // -- normalize path separator to '/' instead of path.sep,
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, '/');

    // -- preparation to allow absolute paths as well
    let root = '';
    if (filepath[0] === '/') {
      root = '/';
      filepath = filepath.slice(1);
    } else if (filepath[1] === ':') {
      root = filepath.slice(0, 3); // c:\
      filepath = filepath.slice(3);
    }

    // -- create folders all the way down
    const folders = filepath.split('/').slice(0, -1); // remove last item, file
    folders.reduce(
      (acc, folder) => {
        const folderPath = acc + folder + '/';
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        return folderPath;
      },
      root, // first 'acc', important
    );

    // -- write file
    fs.writeFileSync(root + filepath, content, charset);
  }

  function getRelativePath(path) {
    //return `${root}${path.sep}${path}`
    return path ? path.replace(/^\./g, `${root}`) : '';
  }
  function toBuildPath(path) {
    let keys = Object.keys(mount);
    let buildPath = path;
    for (key of keys)
      if (path.includes(key)) {
        buildPath = path.replace(key, mount[key].url);
        break;
      }
    return buildPath;
  }
  return {
    name: 'snowpack-svgr-plugin',

    async transform({ fileExt, id, content }) {
      throw new Error(getRelativePath('.' + toBuildPath(id)));
      if (fileExt === '.svgr.svg') {
        let result = '';

        const buildPath = toBuildPath(id);
        if (
          id.includes(getRelativePath(include)) &&
          id.includes(getRelativePath(exclude))
        ) {
          const code = svgr
            .sync(content, {
              componentName: path.basename(id).split('.')[0],
            })
            .replace('import * as React', 'import React');
          result = babel.transformSync(code, {
            presets: ['@babel/preset-react'],
          }).code;
          result = `export default '${buildPath}';`;

          fs.writeFileSync(
            getRelativePath('.' + buildPath) + '.js',
            result,
            'utf-8',
          );
          return;
        } else {
          result = `export default '${buildPath}';`;
          fs.writeFileSync(
            getRelativePath('.' + buildPath) + '.proxy.js',
            result,
            'utf-8',
          );
        }
        return content;
      }
      return content;
    },
  };
};
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const svgr = require('@svgr/core').default;

module.exports = function (
  { root, mount, buildOptions },
  { include, exclude },
) {
  function includes(file, folder) {
    return file.includes(folder);
  }

  function writeFileSyncRecursive(filename, content, charset) {
    // -- normalize path separator to '/' instead of path.sep,
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, '/');

    // -- preparation to allow absolute paths as well
    let root = '';
    if (filepath[0] === '/') {
      root = '/';
      filepath = filepath.slice(1);
    } else if (filepath[1] === ':') {
      root = filepath.slice(0, 3); // c:\
      filepath = filepath.slice(3);
    }

    // -- create folders all the way down
    const folders = filepath.split('/').slice(0, -1); // remove last item, file
    folders.reduce(
      (acc, folder) => {
        const folderPath = acc + folder + '/';
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        return folderPath;
      },
      root, // first 'acc', important
    );

    // -- write file
    fs.writeFileSync(root + filepath, content, charset);
  }

  function getRelativePath(path) {
    //return `${root}${path.sep}${path}`
    return path ? path.replace(/^\./g, `${root}`) : '';
  }
  function toDistPath(path) {
    let keys = Object.keys(mount);
    let buildPath = path;
    for (key of keys)
      if (path.includes(key)) {
        buildPath = path.replace(key, mount[key].url);
        break;
      }
    return buildPath;
  }
  function toBuildPath(path) {
    return buildOptions.out + toDistPath(path);
  }
  return {
    name: 'snowpack-svgr-plugin',
    resolve: {
      input: ['.svgr.svg'],
      output: ['.svgr.svg.js'],
    },

    async load({ filePath }) {
      let result = '';

      const contents = fs.readFileSync(filePath, 'utf-8');
      if (
        filePath.includes(getRelativePath(include)) &&
        filePath.includes(getRelativePath(exclude))
      ) {
        const code = svgr
          .sync(contents, {
            componentName: path.basename(filePath).split('.')[0],
          })
          .replace(
            'import * as React from "react"',
            `import React from "${toBuildPath('/_snowpack/pkg/react.js')}"`,
          );
        result = babel.transformSync(code, {
          presets: ['@babel/preset-react'],
        }).code;
      } else {
        result = `export default '${toDistPath(filePath)}';`;
        writeFileSyncRecursive(toBuildPath(filePath), contents, 'utf-8');
      }
      return { '.svgr.svg.js': result };
    },
  };
};
