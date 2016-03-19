'use strict';

const fs = require('fs');
const path = require('path');
const workingDir = path.resolve(process.cwd());
const packageJson = workingDir + '/package.json';

module.exports = {
  load: function load() {
    return fs.readFileSync(packageJson, 'utf8');
  },
  save: function save(payload) {
    try {
      fs.writeFileSync(packageJson, JSON.stringify(payload,null,2), 'utf8');
    }
    catch(err){
      console.error(err);
    }
  },
  defaultConf: function() {
    let rawConfig = this.load();
    let conf = JSON.parse(rawConfig);
    conf.scripts.test = 'lambda test';
    conf.lambda = {
      srcDir: 'src',
      srcEntry: 'js/index.js'
    };
    this.save(conf);
    return conf;
  }
};