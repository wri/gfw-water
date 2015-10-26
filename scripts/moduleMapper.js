/**
* Create a map object for requirejs to remap dojo and esri modules to a dependency free module
* @param {string} filepath - Filepath to start mapping dependencies from
* @param {string} remapPath - path to remap dojo and esri modules to
* @return {object} map
* - ex. { path: remapPath, path1: remapPath }
*/
module.exports = function (filepath, remapPath) {
  var madge = require('madge');

  var dependencies = madge(filepath, { format: 'amd' }).tree,
      modulePaths = [],
      map = {};

  var filterFunction = function filterFunction (modulePath) {
    return (modulePath.search('esri') > -1) || (modulePath.search('dojo') > -1) || (modulePath.search('dijit') > -1);
  };

  for (var moduleName in dependencies) {
    modulePaths = modulePaths.concat(dependencies[moduleName].filter(filterFunction));
  }

  modulePaths.forEach(function (path) {
    map[path] = remapPath;
  });

  return map;
};
