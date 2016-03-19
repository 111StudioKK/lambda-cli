'use strict';

const fs = require('fs');
const fsPath = require('fs-path');

module.exports = {
  read: (path) => {
    return fs.readFileSync(path, 'utf8');
  },
  write: (path, content) => {
    return fsPath.writeFileSync(path, content, 'utf8');
  }
};