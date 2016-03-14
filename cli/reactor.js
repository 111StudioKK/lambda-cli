#!/usr/bin/env node
'use strict'

const vorpal = require('vorpal')();
const tpl = require('./tpl');
const Case = require('case');
const Path = require('path');
const fsPath = require('fs-path');

const componentsBaseDirectory = './src/components/';

function buildImports (components) {
  if(!components) return '';
  let imports = '';
  components.forEach((component) => {
    let importName = Path.basename(component, '.js');
    imports += `import ${importName} from '/${component}'\n`;
  });
  return imports;
}

function buildComponent(args, cb) {
    let target = `${args.directory}/${Case.pascal(args.name)}/`;
    target += Case.pascal(args.name);

    let variables = [];
    variables.push({key:'ComponentName', value: Case.pascal(args.name)});
    variables.push({key:'ComponentClass', value: Case.kebab(args.name)});
    variables.push({key:'ComponentDescription', value: args.description});
    variables.push({key:'ComponentImports', value: buildImports(args.components)});

    tpl.createFile('./templates/component.js', target + '.js', variables)
    .then(()=>{
      return tpl.createFile('./templates/component.spec.js', target + '.spec.js', variables);
    })
    .then(()=>{
      return tpl.createFile('./templates/component.less', target + '.less', variables);
    })
    .then(()=>{
      cb();
    })
    .catch((err) => {
      console.error(err);
    })
}

function getComponentDirectories() {
  let find = fsPath.findSync(componentsBaseDirectory);
  let directories = find.dirs.filter((directory) => (directory.split('/').length === 3));
  directories.push({name: '[+] Add new directory', value: 'newDir'});
  return directories;
}

function getExistingComponents() {
  let find = fsPath.findSync(componentsBaseDirectory);
  let files = find.files.filter((file) => (file.includes('.js') && !file.includes('.spec.js')));
  return files;
}

vorpal
  .command('component', 'Scaffolds a component (Creates JS / Less / Spec file)')
  .action( function(args, cb) {
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name: '
      },
      {
        type: 'input',
        name: 'description',
        message: 'Component description: '
      },
      {
        type: 'list',
        name: 'directory',
        message: 'Base Directory: ',
        choices: getComponentDirectories,
        when: () => getComponentDirectories().length > 1
      },
      {
        type: 'input',
        name: 'directory',
        message: 'New Base Directory: ',
        when: (answers) => answers.directory === 'newDir' || getComponentDirectories().length === 1,
        filter: (input) => componentsBaseDirectory + input
      },
      {
        type: 'checkbox',
        name: 'components',
        message: 'Import Existing components ? ',
        choices: getExistingComponents,
        when: () => getExistingComponents().length > 0
      }
    ])
    .then((answers) => {
      buildComponent(answers, cb);
    });

  });

vorpal
  .command('serve [host]', 'Serves the application (Defaults to http://localhost:8080)')
  .action(function(args, callback) {
    this.log('bar');
    callback();
  });

vorpal
  .command('build', 'Builds the application (Outputs in the dist directory)')
  .action(function(args, callback) {
    this.log('There\'s a big todo Here');
    callback();
  });

vorpal
  .delimiter('λ::')
  .show();