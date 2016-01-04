import {getUrlParams} from 'utils/params';
import esriConfig from 'esri/config';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import QueryTask from 'esri/tasks/QueryTask';
import domConstruct from 'dojo/dom-construct';
import domQuery from 'dojo/query';
// import ioQuery from 'dojo/io-query';
import lang from 'dojo/_base/lang';
import queryUtils from './query-utils';
import populateReport from './populate-report';
import reportCharts from './report-charts';
import featureCollection from './feature-collection-shell';

let config;
let shedQueryTask;
let watershed;
let watershedGeometry;
let watersheds;
let fireQueryTask;
let printed = 0;
let firesOneDayAgo = queryUtils.oneDayAgo();

esriConfig.defaults.io.corsEnabledServers.push('gis-gfw.wri.org');
esriConfig.defaults.io.corsEnabledServers.push('gis-potico.wri.org');

const printMap = () => {
  // Create a webmap definition for the print service.
  const webmap = lang.clone(config.webmap);
  // Check if there's an overlay to put on the map.
  if (config.mapsToPrint[printed].layer) {
    const layer = config.mapsToPrint[printed].layer;
    if (config.mapsToPrint[printed].name === 'fire') {
      // Add layer definitions to only show fires within last 24 hours.
      layer.layers = layer.visibleLayers.map((id) => {
        return {
          'id': id,
          'layerDefinition': {
            'definitionExpression': firesOneDayAgo
          }
        };
      });
      console.log('fires layer defs', layer.layers);
    }
    webmap.Web_Map_as_JSON.operationalLayers.splice(1, 0, layer);
  }
  // Show the watershed on top.
  webmap.Web_Map_as_JSON.operationalLayers.push(watersheds);
  webmap.Web_Map_as_JSON.exportOptions = {
    outputSize: [ config.mapPrintWidthLarge, config.mapPrintHeight ],
    dpi: config.mapPrintDPI
  };
  webmap.Web_Map_as_JSON = JSON.stringify(webmap.Web_Map_as_JSON);
  // Use the ArcGIS Server print service to generate a map image.
  esriRequest({
    url: config.printer,
    content: webmap
  }, { usePost: true }).then(insertMap, errorHandler);
};

const insertMap = (response) => {
  const mapName = config.mapsToPrint[printed].name;
  const div = domQuery('.' + mapName + ' div.printed-map')[0];
  div.innerHTML = '';
  domConstruct.create('img', {
    src: response.results[0].value.url
  }, div);
  printed += 1;
  if ( printed < config.mapsToPrint.length ) {
    printMap();
  } else {
    reportCharts.use(watershed);
  }
};

const handleWatershed = (result) => {
  console.log('watershed', result.features[0]);
  if ( result.features.length ) {
    const extent = result.features[0].geometry.getExtent();
    config.webmap.Web_Map_as_JSON.mapOptions.extent = extent.toJson();
    watershedGeometry = result.features[0].geometry;
    watershed = result.features[0].toJson();
    watershed.attributes._canopy = config.canopyDensity;
    watershed.symbol = lang.clone(config.watershedSymbol);
    watersheds.featureCollection.layers[0].featureSet.features.push(watershed);
    getFireCount();
  } else {
    console.log('could not find watershed', results);
  }
};

const calculateOffset = (result) => {
  if ( result.features.length ) {
    const offset = result.features[0].geometry.getExtent().getWidth() / config.mapPrintWidthSmall;
    getWaterShed({ id: config.watershedId, offset: offset });
  } else {
    console.log('query for full geometry returned no features', features);
  }
};

const getWaterShed = (params) => {
  let queryCallback;
  let query = new Query();
  query.where = config.watershedIdField + ' = ' + params.id;
  query.geometryPrecision = 0;
  query.returnGeometry = true;
  if ( params.hasOwnProperty('offset') ) {
    query.maxAllowableOffset = params.offset;
    query.outFields = ['*'];
    queryCallback = handleWatershed;
  } else {
    query.maxAllowableOffset = config.simplifyGuess;
    queryCallback = calculateOffset;
  }
  shedQueryTask.execute(query).then(queryCallback, errorHandler);
};

const getFireCount = () => {
  let fireCount;
  let fireQuery = new Query();
  fireQuery.geometry = watershedGeometry;
  fireQuery.where = firesOneDayAgo;
  fireQueryTask.executeForIds(fireQuery).then(
    (results) => {
      console.log('fire results', results);
      if (results) {
        fireCount = results.length;
      } else {
        fireCount = 0;
      }
      watershed.attributes._fireCount = fireCount;
      printMap();
      populateReport.use({ config: config, watershed: watershed });
    },
    errorHandler
  );
};

const errorHandler = (error) => {
  console.log('Error generating watershed report', error);
};

const printAll = (options) => {
  config = options;
  const queryString = getUrlParams(window.location.href);
  console.log('query string', queryString);
  config.watershedId = queryString[config.watershedQueryStringParam] || config.watershedId;
  config.canopyDensity = queryString.canopyDensity || config.canopyDensity;
  // Set up query task to either hit watershed layer or custom analysis area layer.
  if ( config.watershedId.indexOf('C_') > -1 ) {
    shedQueryTask = new QueryTask(config.customAnalysisAreasUrl);
  } else {
    shedQueryTask = new QueryTask(config.watershedUrl);
  }
  config.watershedId = +config.watershedId.replace(/W_|C_/i, '');
  fireQueryTask = new QueryTask(config.fireUrl);
  watersheds = lang.clone(featureCollection);
  getWaterShed({ id: config.watershedId });
};

export default {
  printAll: printAll
};
