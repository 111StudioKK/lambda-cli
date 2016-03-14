'use strict';

const fs = require('fs')
const fsPath = require('fs-path');

module.exports = {
  createFile: function (src, target, variables) {
    return new Promise((resolve, reject) => {
      fs.readFile(src, 'utf8', (err, file) => {
        if (err) return reject(err);

        variables.forEach ((variable) => {
          let regex = new RegExp(variable.key, 'g')
          file = file.replace(regex, variable.value);
        });

        fsPath.writeFile(target, file, 'utf8',  (err) => {
          if (err) return reject(err);
          console.info('::λ File ' + target + ' created.')
          resolve();
        });
      });
    });
  }
}