'use strict';

const fsPath = require('fs-path');
const Path = require('path');
const Scaffold = require('./scaffold');

const templateDir = Path.normalize(__dirname + '/../templates/app/');
const confDir = Path.normalize(__dirname + '/../templates/conf/');

module.exports = {
  copyAppTemplate: (srcDir) => {
    let srcDirTarget = Path.resolve(`${process.cwd()}/${srcDir}`);
    fsPath.mkdirSync(srcDirTarget);
    fsPath.copySync( templateDir, Path.resolve(`${process.cwd()}/${srcDir}`) );
    fsPath.copySync( confDir + '*', Path.normalize(process.cwd()) );
  },
  renderAppComponent: (conf) => {
    Scaffold.component({
      directory: conf.lambda.srcDir + '/js/app',
      name: 'App',
      version: conf.version,
      description: 'Main App module for ' + conf.name + ' v' + conf.version
    }, () => console.info('App component created.'));
  }
};