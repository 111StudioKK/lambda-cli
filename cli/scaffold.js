'use strict';
const File = require('./file');
const Path = require('path');
const Mustache = require('mustache');
const fsPath = require('fs-path');
const Case = require('case');
const templateDir = __dirname + '/../templates/scaffolds/';

module.exports = {
  component: (args, cb) => {
    let target = `${args.directory}/${Case.pascal(args.name)}/${Case.pascal(args.name)}.`;
    let scaffoldFilePath = templateDir + 'component/component.';
    let jsxFile = File.read(scaffoldFilePath + 'jsx');
    let lessFile = File.read(scaffoldFilePath + 'less');
    let specFile = File.read(scaffoldFilePath + 'spec.js');
    let componentData = {
      name: Case.pascal(args.name),
      class: Case.kebab(args.name),
      description: args.description
    };
    // let render =
    // File.write(appPath, render);
    function buildImports (components) {
      if(!components) return '';
      let imports = '';
      components.forEach((component) => {
        let importName = Path.basename(component, '.js');
        imports += `import ${importName} from '/${component}'\n`;
      });
      return imports;
    }


    File.write(target + 'jsx', Mustache.render(jsxFile, componentData));
    File.write(target + 'less', Mustache.render(lessFile, componentData));
    File.write(target + 'spec.js', Mustache.render(specFile, componentData));

    return cb();
  }
};