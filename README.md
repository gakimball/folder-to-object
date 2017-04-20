# folder-to-object

> Convert a folder of data files into an object

[![Travis](https://img.shields.io/travis/gakimball/folder-to-object.svg?maxAge=2592000)](https://travis-ci.org/gakimball/folder-to-object) [![npm](https://img.shields.io/npm/v/folder-to-object.svg?maxAge=2592000)](https://www.npmjs.com/package/folder-to-object)

## Installation

```bash
npm install folder-to-object
```

## Usage

Given this folder structure:

```
- data/
  - one.json
  - two/
    - three.yml
    - four.js
```

You can convert the entire folder and the contents of its files into one big object.

```js
const { join } = require('path');
const toObject = require('folder-to-object');

toObject(join(process.cwd(), 'data')).then(res => console.log(res));
/*
{
  "one": { ... },
  "two": {
    "three": { ... },
    "four": { ... },
  },
}
*/
```

Supported formats include JSON, YAML, CSON, or a JavaScript file with a `module.exports`.

**Note:** if you have a folder and file with the same name at the same level, the two will be in conflict. Try to avoid this.

## API

### toObject(path)

Convert the data files in a folder into an object matching the directory structure of the folder.

- **folder** (String): Folder to parse.

Returns a Promise containing the final object.

## Local Development

```bash
git clone https://github.com/gakimball/folder-to-object
cd folder-to-object
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
