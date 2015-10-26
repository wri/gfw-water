var ReactDomServer = require('react-dom/server');
var moduleMapper = require('./moduleMapper');
var requirejs = require('requirejs');
var cheerio = require('cheerio');
var React = require('react');
var path = require('path');
var fs = require('fs');

//- Root path of project
var basepath = path.join(__dirname, '../');

//- Paths for the components, modules root, build profile, and dist html file
var paths = {
  canopyModal: 'js/components/Modals/CanopyModal',
  alertsModal: 'js/components/Modals/AlertsModal',
  layerModal: 'js/components/Modals/LayerModal',
  shareModal: 'js/components/Modals/ShareModal',
  map: 'js/components/Map',
  modulesRoot: path.join(basepath, 'build/js/map'),
  profile: path.join(basepath, 'map.build.js'),
  html: path.join(basepath, 'dist/map.html')
};

//- Read in the profile and convert to JSON
var buildProfile = fs.readFileSync(paths.profile, 'utf-8');
var buildConfig = eval(buildProfile);

//- Remap missing modules to a module with no dependencies to prevent requirejs from trying to load them
//- module mapper will return an object like below for all dojo/esri modules used in the project
//- { 'esri/map': 'js/config', 'dojo/dom-class': 'js/config' }
var moduleMap = moduleMapper(paths.modulesRoot, 'js/config');

requirejs.config({
  baseUrl: path.join(basepath, buildConfig.baseUrl),
  paths: buildConfig.paths,
  map: { '*': moduleMap },
  nodeRequire: require
});

//- Get Components, make them a factory, and render them to static markup
var CanopyModal = React.createFactory(requirejs(paths.canopyModal));
var AlertsModal = React.createFactory(requirejs(paths.alertsModal));
var LayerModal = React.createFactory(requirejs(paths.layerModal));
var ShareModal = React.createFactory(requirejs(paths.shareModal));
var Map = React.createFactory(requirejs(paths.map));

var canopyModal = ReactDomServer.renderToStaticMarkup(CanopyModal());
var alertModal = ReactDomServer.renderToStaticMarkup(AlertsModal());
var layerModal = ReactDomServer.renderToStaticMarkup(LayerModal());
var shareModal = ReactDomServer.renderToStaticMarkup(ShareModal());
var map = ReactDomServer.renderToStaticMarkup(Map());

//- Load in the Distribution HTML and append all the components into it
var $ = cheerio.load(fs.readFileSync(paths.html, 'utf-8'));
$('#canopy-modal').append(canopyModal);
$('#alerts-modal').append(alertModal);
$('#layer-modal').append(layerModal);
$('#share-modal').append(shareModal);
$('#root').append(map);

//- Write out the distribution html file
fs.writeFile(paths.html, $.html(), function (writeErr) {
  if (writeErr) { console.error(writeErr); return; }
  console.log('Components successfully prerendered.');
});
