'use strict';

const ExecSync = require('child_process').execSync;

module.exports = (cmd, cb) => {
  ExecSync(cmd, {stdio: [0, 1, 2]});
  if(cb) return cb();
};