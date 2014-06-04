var fs = require('fs');
var vm = require('vm');
var path = require('path');
var _ = require('lodash').runInContext();

var isAddOnRegEx = _.bindAll(/^_\..+/, 'test');
var context = vm.createContext({_: _});
var rightCurryVm = _.partialRight(vm.runInNewContext, context);
function simpleReadFile(filename) {
  return fs.readFileSync(path.join(__dirname, filename));
}
_(fs.readdirSync(__dirname)).filter(isAddOnRegEx.test).map(simpleReadFile).each(function (code) {
  rightCurryVm(code);
});

module.exports = _;
