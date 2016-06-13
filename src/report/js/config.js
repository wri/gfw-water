import KEYS from 'report/constants';

let erosionImageServer = 'http://50.19.205.13/arcgis/rest/services/erosion/ImageServer';

export default {
  assetUrls: {
    ionCSS: '../vendor/ion.rangeslider/css/ion.rangeSlider.css',
    ionSkinCSS: '../vendor/ion.rangeslider/css/ion.rangeSlider.skinNice.css',
    highcharts: 'http://code.highcharts.com/highcharts.js',
    highchartsExport: 'http://code.highcharts.com/modules/exporting.js',
    rangeSlider: '../vendor/ion.rangeslider/js/ion.rangeSlider.min.js'
  },
  webmap: {
    'f': 'json',
    'Web_Map_as_JSON': {
      mapOptions: {
        showAttribution: false,
        extent: null,
        spatialReference: { wkid: 102100 }
      },
      operationalLayers: [{
        id: 'layer0',
        title: 'layer0',
        opacity: 1,
        url: 'https://api.tiles.mapbox.com/v4/wri.c974eefc/${level}/${col}/${row}.png',
        type: 'WebTiledLayer',
        urlTemplate: 'https://api.tiles.mapbox.com/v4/wri.c974eefc/{level}/{col}/{row}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg'
      }, {
        id: 'layer1',
        title: 'layer1',
        opacity: 1,
        url: 'http://hydrology.esri.com/arcgis/rest/services/WorldHydroReferenceOverlay/MapServer'
      }],
      exportOptions: null
    },
    'Format': 'PNG32',
    'Layout_Template': 'MAP_ONLY'
  },
  proxy: {
    featureServer: {
      urlPrefix: 'gis-gfw.wri.org/arcgis/rest/services/user_features/FeatureServer',
      proxyUrl: 'http://localhost/proxy/proxy.php'
      // proxyUrl: 'http://wri-gfw-water.herokuapp.com/proxy/proxy.php'
    }
  },
  corsEnabledServers: [
    erosionImageServer
  ],
  canopyDensity: 10,
  watershedId: 1003,
  watershedIdField: 'maj_bas',
  watershedName: 'maj_name',
  watershedQueryStringParam: 'fid',
  watershedUrl: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer/1',
  customAnalysisAreasUrl: 'http://gis-gfw.wri.org/arcgis/rest/services/user_features/FeatureServer/0',
  watershedSymbol: {
    'color': [255, 255, 255, 0],
    'outline': {
      'color': [64, 153, 206, 255],
      'width': 2,
      'type': 'esriSLS',
      'style': 'esriSLSSolid'
    },
    'type': 'esriSFS',
    'style': 'esriSFSSolid'
  },
  fireUrl: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4',

  mapsToPrint: [{
    name: 'overview'
  }, {
    name: 'recent-loss',
    layers: [{
      'id': 'layer2',
      'title': 'layer2',
      'opacity': 1,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer/',
      'bandIds': null,
      'compressionQuality': null,
      'interpolation': null,
      'renderingRule': {
        'rasterFunction': 'ForestCover_lossyear'
      }
    }]
  }, {
    name: 'historical-loss',
    layers: [{
      'id': KEYS.TCD,
      'title': KEYS.TCD,
      'opacity': 1,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer',
      'bandIds': null,
      'compressionQuality': null,
      'interpolation': null,
      'renderingRule': {}
    }, {
      'id': 'layer2',
      'title': 'layer2',
      'opacity': 1,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
      'layers': [{
        'id': 6,
        'layerDefinition': {
          'source': {
            'type': 'mapLayer',
            'mapLayerId': 6
          }
        }
      }]
    }]
  }, {
    name: 'erosion',
    layers: [{
      'id': 'layer2',
      'title': 'layer2',
      'opacity': 1,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer/',
      'visibleLayers': [4]
    }]
  }, {
    name: 'fire',
    layers: [{
      'id': 'layer2',
      'title': 'layer2',
      'opacity': 1,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      'visibleLayers': [0, 1, 2, 3]
    }]
  }, {
    name: 'water-stress',
    layers: [{
      'id': 'layer2',
      'title': 'layer2',
      'opacity': 0.8,
      'minScale': 0,
      'maxScale': 0,
      'url': 'http://gis.wri.org/arcgis/rest/services/Aqueduct/aqueduct_global_2014/MapServer',
      'layers': [{
        'id': 1,
        'layerDefinition': {
          'source': {
            'type': 'mapLayer',
            'mapLayerId': 1
          }
        }
      }]
    }]
  }],

  printer: 'http://gis-gfw.wri.org/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute',
  simplifyGuess: 1000,
  mapPrintHeight: 300,
  mapPrintSizeSquare: 450,
  mapPrintWidthSmall: 512,
  mapPrintWidthLarge: 1024,
  mapExtentExpandFactor: 1.3,
  mapPrintDPI: 96,
  exportImageRenderingRuleForTCD: (density) => {
    return {
      'rasterFunction': 'Colormap',
        'rasterFunctionArguments': {
          'Colormap': [[1, 174, 203, 107]],
          'Raster': {
            'rasterFunction': 'Remap',
            'rasterFunctionArguments': {
              'InputRanges': [+density, 101],
              'OutputValues': [1],
              'AllowUnmatched': false
            }
          }
        },
        'variableName': 'Raster'
    };
  }

};

const text = {
  modal: {
    share: {
      title: 'Share this view',
      linkInstructions: 'Copy and paste the link to share it or use the buttons below to share on social media.',
      copyFailure: 'Sorry, we were unable to copy this to your clipboard, please press Cmd + c on Mac or Ctrl + c on Windows/Linux.',
      copyButton: 'Copy',
      copiedButton: 'Copied',
      googleUrl: url => `https://plus.google.com/share?url=${url}`,
      twitterUrl: url => `https://twitter.com/share?url=${url}&via=gfw-water`,
      facebookUrl: url => `https://www.facebook.com/sharer.php?u=${url}`
    }
  },
  charts: {
    riskLookup: {
      1: 'Low',
      2: 'Low to medium',
      3: 'Medium',
      4: 'Medium to high',
      5: 'Extremely high',
      10: 'Not applicable'
    }
  },
  report: {
    na: 'Not applicable'
  },
  fields: {
    area: 'ws_ha'
  }
};

let analysis = {
  imageService: 'http://gis-gfw.wri.org/arcgis/rest/services/image_services/analysis/ImageServer',
  mosaicRule: rasterId => {
    return {
      'mosaicMethod': 'esriMosaicLockRaster',
      'mosaicOperation': 'MT_FIRST',
      'lockRasterIds': [rasterId],
      'ascending': true
    };
  },
  rasterRemapForTCD: (rasterId, density) => {
    return {
      'rasterFunction': 'Arithmetic',
      'rasterFunctionArguments': {
        'Raster': {
          'rasterFunction': 'Remap',
          'rasterFunctionArguments': {
            'InputRanges': [0, +density, +density, 101],
            'OutputValues': [0, 1],
            'Raster': '$520',
            'AllowUnmatched': false
          }
        },
        'Raster2': `$${rasterId}`,
        'Operation': 3
      }
    };
  }
};

analysis[KEYS.WETLAND] = {
  rasterId: 543,
  field: 'wet_ha'
};

analysis[KEYS.TCD] = {
  rasterId: 547,
  field: density => `tc_g${density}_ha`,
  valueIndex: {
    10: 1,
    15: 2,
    20: 3,
    25: 4,
    30: 5,
    50: 6,
    75: 7
  }
};

analysis[KEYS.PTC] = {
  rasterId: 545,
  field: 'ptc_ha'
};

analysis[KEYS.LC] = {
  rasterId: 548,
  fields: ['lc_crop_ha', 'lc_for_ha', 'lc_grass_ha', 'lc_dev_ha', 'lc_bar_ha', 'lc_other_ha'],
  labels: ['Cropland', 'Forest', 'Grassland', 'Developed', 'Barren', 'Other']
};

analysis[KEYS.TCL] = {
  rasterId: 530,
  slopeField: density => `tlt_g${density}_ha`,
  allField: density => `tl_g${density}_all_ha`,
  field: (density, index) => {
    // Index should always be two digits, 1 = 01, 2 = 02, 10 = 10, etc. valid values are 01 - 14
    let indexValue = index < 10 ? `0${index}` : index;
    return `tl_g${density}_${indexValue}_ha`;
  },
  fieldMax: 14 // Represents 2014, this will need to update when the service does
};

analysis[KEYS.R_FIRES_AVG] = {
  rasterId: 551,
  field: 'fire_c'
};

analysis[KEYS.R_FIRES] = {
  rasterId: 551,
  field: 'rs_fire_c',
  pixelSize: 4308.246486
};

analysis[KEYS.R_EROSION] = {
  rasterId: 549,
  field: 'rs_sed_c',
  url: erosionImageServer,
  pixelSize: 419.0266215
};

analysis[KEYS.R_TCL] = {
  field: 'rs_tl_c'
};

analysis[KEYS.R_HTCL] = {
  field: 'rs_pf_c'
};

analysis[KEYS.ARID] = {
  rasterId: 550
};

analysis[KEYS.DAMS] = {
  url: 'http://gis-gfw.wri.org/arcgis/rest/services/infrastructure/MapServer/0',
  content: {
    returnIdsOnly: true,
    where: '1 = 1'
  },
  field: 'dams_c'
};

analysis[KEYS.WATER] = {
  url: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer/0',
  content: {
    returnIdsOnly: true,
    where: '1 = 1'
  },
  field: 'wd_c'
};

let grader = {};

//- These functions should return a value ready to be dropped in the UI
grader[KEYS.R_FIRES] = (value) => {
  if (value <= 0.000018) {
    return 1;
  } else if (value >= 0.000019 && value <= 0.000071) {
    return 2;
  } else if (value >= 0.000072 && value <= 0.00016) {
    return 3;
  } else if (value >= 0.00017 && value <= 0.00036) {
    return 4;
  } else if (value >= 0.00037) {
    return 5;
  }
};

grader[KEYS.R_EROSION] = (value) => {
  //- If value is ten, then return value, it is a special value
  //- to represent that the risk score is not applicable
  if (value === 10) {
    return 10;
  } else if (value <= 0.28) {
    return 1;
  } else if (value >= 0.29 && value <= 1.33) {
    return 2;
  } else if (value >= 1.34 && value <= 2.56) {
    return 3;
  } else if (value >= 2.57 && value < 3.49) {
    return 4;
  } else if (value >= 3.49) {
    return 5;
  }
};

grader[KEYS.R_TCL] = (value) => {
  //- If value is ten, then return value, it is a special value
  //- to represent that the risk score is not applicable
  if (value === 10) {
    return 10;
  } else if (value <= 0.025) {
    return 1;
  } else if (value >= 0.026 && value <= 0.042) {
    return 2;
  } else if (value >= 0.043 && value <= 0.060) {
    return 3;
  } else if (value >= 0.061 && value <= 0.1) {
    return 4;
  } else if (value >= 0.11) {
    return 5;
  }
};

grader[KEYS.R_HTCL] = (value) => {
  //- If value is ten, then return value, it is a special value
  //- to represent that the risk score is not applicable
  if (value === 10) {
    return value;
  } else if (value >= 0.75) {
    return 1;
  } else if (value >= 0.55 && value <= 0.74) {
    return 2;
  } else if (value >= 0.36 && value <= 0.54) {
    return 3;
  } else if (value >= 0.17 && value <= 0.35) {
    return 4;
  } else if (value <= 0.16) {
    return 5;
  }
};



export const riskGrader = grader;
export const modalText = text.modal;
export const chartText = text.charts;
export const reportText = text.report;
export const fieldConfig = text.fields;
export const analysisConfig = analysis;
