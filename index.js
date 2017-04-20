'use strict';

const path = require('path');
const load = require('load-whatever');
const dotProp = require('dot-prop');
const pify = require('pify');
const glob = pify(require('glob'));

/**
 * Convert the data files in a folder into an object matching the directory structure of the folder.
 * @param {String} folder - Folder to parse.
 * @returns {Promise.<Object>} Promise containing object.
 */
module.exports = folder => {
  // Final output
  const obj = {};

  // Create an absolute path if a relative one was provided
  const folderPath = path.isAbsolute(folder)
    ? folder
    : path.join(process.cwd(), folder);

  // Pattern to match (matches every extension supported by the load-whatever library)
  const globPattern = path.join(folderPath, `**/*.{${load.supports.join(',')}}`);

  // Converts a file path into an object path, i.e. `path.to.object`
  const makeObjectPath = filePath => {
    return path.relative(folderPath, filePath).replace(/\.[^.]+$/, '').split(path.sep).join('.');
  };

  // Get every file in the directory
  // For each file, load it, then assign it to the final object based on its filename
  return glob(globPattern).then(paths =>
    Promise.all(paths.map(filePath => load(filePath).then(contents => {
      const objectPath = makeObjectPath(filePath);
      dotProp.set(obj, objectPath, contents);
    })))
  ).then(() => obj);
};
