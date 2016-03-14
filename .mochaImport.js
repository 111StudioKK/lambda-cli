var prunk = require('prunk');
var fs = require('fs');

require.extensions['.js'] = function(module, filename) {
  prunk.suppress(/\.(less|svg|gif|jpg|png)$/);
  var content = fs.readFileSync(filename, 'utf8');
  return module._compile(content, filename);
};