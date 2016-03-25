#!/usr/bin/env node
'use strict';
const Vorpal = require('vorpal')();
const Chalk = Vorpal.chalk;
const ls = require('ls');
const Path = require('path');
const Config = require('./config');
const Run = require('./run');
const InitFiles = require('./initFiles');
const Scaffold = require('./scaffold');
const LAMBDA_HOME = Path.resolve(__dirname + '/..') + '/';
const LAMBDA_PKG = require(LAMBDA_HOME + 'package.json');

let conf = {};
let Helpers;

function initCli(delimiter) {
  delimiter = delimiter || Chalk.green('λ['+ conf.name + ' ' + conf.version +']>');
  Vorpal
    .delimiter(delimiter)
    .parse(process.argv)
    .history('lambda')
    .show();
}

function loadConf() {
  try{
    let rawConfig = Config.load();
    conf = JSON.parse(rawConfig);
    Helpers = require('./helpers');
    initCli(Chalk.green());
  }
  catch(err) {

    if(err.code === 'ENOENT'){
      console.info(Chalk.red('No package.json found, running npm init'));
      initCli('...');
      Vorpal.exec('init').then(()=> {
      }).catch(function(err){
        console.error(err);
      });
    }
    else {
      throw new Error(err);
    }
  }
}

Vorpal.help( function(cmd) {
  let help = (cmd) ? `${Chalk.red(cmd)} is an invalid command.` : '';

  help += `
${Chalk.yellow('░░░░░░░░░░░░░░░░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░███░░░░░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░░░██░░░░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░░░░██░░░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░░░████░░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░░██░░██░░░░░░░░░░')}
${Chalk.yellow('░░░░░░░░██░░░░██░░░░░░░░░')}
${Chalk.yellow('░░░░░░░██░░░░░░██░░░░░░░░')}
${Chalk.yellow('░░░░░░██░░░░░░░░███░'+LAMBDA_PKG.version)}
${Chalk.yellow('░░░░░░░░░░░░░░░░░░░░░░░░░')}
${Chalk.blue('build')}:       Build the application for production. (available on the dist folder)
${Chalk.blue('component')}:   Scaffolds a component. (Creates JS / Less / Spec file)
${Chalk.blue('exit | quit')}: Bye bye !
${Chalk.blue('help')}:        Displays this help.
${Chalk.blue('serve')}:       Serves the application locally.
${Chalk.blue('test')}:        Runs the test suite on all spec.js files.`;
  return help;
});

Vorpal
  .command('component', 'Scaffolds a component (Creates JS / Less / Spec file)')
  .action( function(args, cb) {
    let jsDir = conf.lambda.srcDir + '/js/';
    let components = ls(jsDir + '**/*.jsx', {type: 'file'}).map((component) => {
      return {
        name: `[${component.name}] (${component.full})`,
        value: component.full
      };
    });

    let dirs = ls(jsDir + '*' , {type: 'dir'}).map ((dir) => {
      return {
        name: `[${dir.name}] (${dir.full})`,
        value: dir.full
      };
    });
    dirs.push({name: '[+] Add new directory', value: 'newDir'});
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name: ',
        validate: (input) => !!input
      },
      {
        type: 'input',
        name: 'description',
        message: 'Component description: ',
        filter: (input) => (input.endsWith('.')) ? input : input + '.',
        validate: (input) => !!input
      },
      {
        type: 'list',
        name: 'directory',
        message: 'Base Directory: ',
        choices: dirs,
        when: () => dirs.length > 1,
        validate: (input) => !!input
      },
      {
        type: 'input',
        name: 'directory',
        message: 'New Base Directory: ',
        when: (answers) => answers.directory === 'newDir' || dirs.length === 1,
        filter: (input) => jsDir + input,
        validate: (input) => !!input
      },
      {
        type: 'checkbox',
        name: 'components',
        message: 'Import Existing components ? ',
        choices: components,
        when: () => components.length > 0
      }
    ])
    .then((answers) => {
      try{
        console.log('test');
        Scaffold.component(answers, cb);
      }
      catch(err) {
        console.error(err);
      }
    });

  });

Vorpal
  .command('init', 'Project init')
  .hidden()
  .action(function(args, callback){
    Run('npm init');
    Run('npm i --save react react-dom redux react-redux');
    Run('npm i --save-dev eslint eslint-plugin-react');
    conf = Config.defaultConf();
    InitFiles.copyAppTemplate(conf.lambda.srcDir);
    InitFiles.renderAppComponent(conf);
    this.log(Chalk.green('Project Init done'));
    initCli();
    callback();
  });

Vorpal
  .command('serve', 'Serves the application on a platter')
  .action(function(args, cb) {
    let srcDirectory = Path.resolve(conf.lambda.srcDir);
    let entryPoint = Path.resolve(conf.lambda.srcDir + '/' + conf.lambda.srcEntry);
    let cmd = LAMBDA_HOME + 'node_modules/.bin/webpack-dev-server ';
    let cmdArgs = [
      '--config ' + LAMBDA_HOME + 'webpack.dev.js',
      '--srcDirectory ' + srcDirectory,
      '--entryPoint ' + entryPoint
    ];
    cmd += cmdArgs.join(' ');
    Run(cmd, cb);
  });

Vorpal
  .command('build', 'Builds the application for ptoduction')
  .action(function(args, cb) {
    let srcDirectory = Path.resolve(conf.lambda.srcDir);
    let entryPoint = Path.resolve(conf.lambda.srcDir + '/' + conf.lambda.srcEntry);
    let cmd = LAMBDA_HOME + 'node_modules/.bin/webpack';
    let cmdArgs = [
      '-p',
      '--config ' + LAMBDA_HOME + 'webpack.prod.js',
      '--srcDirectory ' + srcDirectory,
      '--entryPoint ' + entryPoint
    ];
    cmd += ' ' + cmdArgs.join(' ');
    Run(cmd, cb);
  });

loadConf();