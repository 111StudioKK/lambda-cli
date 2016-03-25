'use strict';
const execSync = require('child_process').execSync;
const fsPath = require('fs-path');
const Config = require('./config');
let rawConfig = Config.load();
const conf = JSON.parse(rawConfig);
const srcDirectory = process.cwd() + '/' + conf.srcDirectory;
const componentsBaseDirectory = srcDirectory + 'components/';
const ProcessArgs = process.argv;
const externalArgs = [
  'serve',
  'build',
  'test'
];

module.exports = {

  isExternalProcess: () => {
    let processArg = ProcessArgs[2] || null;
    return (externalArgs.indexOf(processArg) !== -1) ? processArg : false;
  },

  run: (cmd, cb) => {

    switch (cmd) {
    case 'test':
      execSync('node_modules/mocha/bin/mocha', ['.mochaSetup.js', srcDirectory + '**/*.spec.js', '--compilers', 'js:.mochaImport.js'], {stdio: [0, 1, 2]});
      break;
    case 'serve':
      execSync('npm run serve -- --srcDirectory ' + srcDirectory + ' --entryPoint ' + conf.srcEntryPoint + ' --content-base ' + srcDirectory + '../build/', {stdio: [0, 1, 2]});
      break;
    case 'npm init':
      execSync('npm init', {stdio: [0, 1, 2]});
    }

    if(cb) return cb();
  }

};