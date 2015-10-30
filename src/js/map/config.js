import KEYS from 'js/constants';

export const config = {

  assets: {
    ionCSS: 'vendor/ion.rangeslider/css/ion.rangeSlider.css',
    ionSkinCSS: 'vendor/ion.rangeslider/css/ion.rangeSlider.skinNice.css',
    highcharts: 'http://code.highcharts.com/highcharts.js',
    highchartsMore: 'http://code.highcharts.com/highcharts-more.js'
  },

  map: {
    id: 'map',
    options: {
      navigationMode: 'css-transforms',
      force3DTransforms: true,
      showAttribution: false,
      center: [-51, 17],
      fadeOnZoom: true,
      slider: false,
      logo: false,
      zoom: 3
    },
    customBasemap: {
      url: 'https://api.tiles.mapbox.com/v4/wri.c974eefc/${level}/${col}/${row}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg',
      options: {
        id: KEYS.wriBasemap,
        visible: true
      }
    },
    geometryServiceUrl: 'http://gis-gfw.wri.org/arcgis/rest/services/Utilities/Geometry/GeometryServer'
  },

  // This config is for both the layers and the layer list, if no url is present, the layer will not be rendered
  // and is strictly for the UI, if no group is present, the layer will not appear in the UI, just be added to the map
  layers: [
    {
      id: KEYS.wetlands,
      order: 5,
      type: 'dynamic',
      label: 'Wetlands',
      group: 'watershed',
      className: 'wetlands',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer',
      layerIds: [2]
    },
    {
      id: KEYS.treeCover,
      order: 4,
      type: 'image',
      label: 'Tree cover',
      sublabel: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
      group: 'watershed',
      className: 'tree-cover',
      url: 'http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 174, 203, 107]],
      inputRange: [30, 101],
      outputRange: [1]
    },
    {
      id: KEYS.majorDams,
      order: 9,
      type: 'dynamic',
      label: 'Major dams',
      group: 'watershed',
      className: 'dams',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/infrastructure/MapServer',
      layerIds: [0]
    },
    {
      id: KEYS.waterIntake,
      order: 10,
      type: 'dynamic',
      label: 'Water withdrawal',
      group: 'watershed',
      className: 'intake',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer',
      layerIds: [0]
    },
    // {
    //   id: KEYS.treeCoverChange,
    //   label: 'Tree cover change',
    //   group: 'watershedRisk',
    //   kids: ['loss', 'gain'],
    //   isGroupLabel: true
    // },
    {
      id: KEYS.loss,
      order: 6,
      type: 'image',
      label: 'Tree cover loss',
      group: 'watershedRisk',
      className: 'loss',
      sublabel: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: KEYS.gain,
      order: 7,
      type: 'tiled',
      label: 'Tree cover gain',
      group: 'watershedRisk',
      className: 'gain',
      sublabel: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: KEYS.historicLoss,
      order: 3,
      type: 'dynamic',
      label: 'Original forest',
      group: 'watershedRisk',
      className: 'historic-loss',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
      layerIds: [6]
    },
    // {
    //   id: KEYS.fires,
    //   label: 'Fires',
    //   group: 'watershedRisk',
    //   kids: ['active-fires', 'burn-scars'],
    //   isGroupLabel: true
    // },
    {
      id: KEYS.activeFires,
      order: 8,
      type: 'dynamic',
      label: 'Active fires',
      group: 'watershedRisk',
      className: 'active-fires',
      sublabel: '(daily, 1km, global, NASA)',
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: KEYS.burnScars,
      order: 1,
      type: 'dynamic',
      label: 'Burn scars (coming soon)',
      group: 'watershedRisk',
      className: 'burn-scars',
      disabled: true
    },
    {
      id: KEYS.sediment,
      order: 2,
      type: 'dynamic',
      label: 'Sedimentation',
      group: 'watershedRisk',
      className: 'sediment',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer',
      layerIds: [4]
    },
    {
      id: KEYS.waterStress,
      type: 'dynamic',
      order: 1,
      label: 'Baseline water stress',
      group: 'watershedRisk',
      className: 'water-stress',
      url: 'http://gis.wri.org/arcgis/rest/services/Aqueduct/aqueduct_global_2014/MapServer',
      layerIds: [1],
      opacity: 0.80
    },
    // These layers are not in the UI and should be the top most layers
    {
      id: KEYS.watershed,
      order: 11,
      type: 'feature',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/hydrology/MapServer/1',
      visible: true
    },
    {
      id: KEYS.rivers,
      order: 12,
      type: 'tiled',
      url: 'http://hydrology.esri.com/arcgis/rest/services/WorldHydroReferenceOverlay/MapServer',
      visible: true
    }
  ],

  symbol: {
    gfwBlue: [64, 153, 206],
    svgPath: 'M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z'
  },

  alertsModal: {
    requests: {
      fires: {
        url: 'https://gfw-fires.wri.org/subscribe_by_polygon',
        options: {
          method: 'POST',
          handleAs: 'json',
          headers: {
            'X-Requested-With': null
          },
          data: {
            msg_type: 'email',
            msg_addr: null,
            area_name: null,
            features: null
          }
        },
        successMessage: 'subscription successful'
      },
      forma: {
        url: 'http://gfw-apis.appspot.com/subscribe',
        options: {
          method: 'POST',
          data: {
            topic: 'updates/forma',
            geom: null,
            email: null
          }
        }
      }
    }
  },

  text: {
    errors: {
      missingLayerConfig: 'You provided a layer config containing a url but not a type, please specify the layer type in the layer config.',
      incorrectLayerConfig: type => `You provided an invalid type, the application is not configured for type: ${type}. Please use the correct type or implement it in the LayerFactory.`,
      geolocationUnavailable: 'Sorry, it looks like your browser does not support geolocation, please try the latest versions of Safari, Chrome, or Firefox.',
      geolocationFailure: message => `Error retrieving location at this time. ${message}`
    },
    layerPanel: {
      watershed: 'Know your watershed',
      watershedRisk: 'Identify Watershed Risks',
      waterStressLegend: {
        min: 'Low',
        max: 'High',
        arid: 'Arid',
        nodata: 'No Data'
      },
      sedimentLegend: {
        min: 'Low',
        max: 'Extreme'
      },
      firesOptions: [
        {label: 'Past Week', value: 7},
        {label: 'Past 72 hours', value: 3},
        {label: 'Past 48 hours', value: 2},
        {label: 'Past 24 hours', value: 1}
      ],
      lossOptions: [
        {label: '2001', value: 1},
        {label: '2002', value: 2},
        {label: '2003', value: 3},
        {label: '2004', value: 4},
        {label: '2005', value: 5},
        {label: '2006', value: 6},
        {label: '2007', value: 7},
        {label: '2008', value: 8},
        {label: '2009', value: 9},
        {label: '2010', value: 10},
        {label: '2011', value: 11},
        {label: '2012', value: 12},
        {label: '2013', value: 13},
        {label: '2014', value: 14}
      ],
      treeCover: {
        densityFirst: 'Displaying loss with',
        densitySecond: 'canopy density.'
      }
    },
    analysisPanel: {
      searchAllPlaceholder: 'Search by river, watershed, or city',
      searchEsriPlaceholder: 'Search by city',
      searchWatershedPlaceholder: 'Search by watershed',
      sourceName: 'Watersheds',
      searchWidgetId: 'esri-search-widget',
      analyzeButton: 'Analyze Watershed',
      watershedTabId: 'currentWatershed', // Can be anything as long as its different from analysisTabId
      watershedTabLabel: 'Current Watershed',
      watershedTabPlaceholder: 'To analyze, use the search bar to find your watershed or click the map to find your location of interest.',
      customTabId: 'customWatershed',
      customTabLabel: 'Custom Area',
      customTabPlaceholder: 'Do some custom analysis here',
      clearAnalysisButton: 'Clear Analysis',
      getAlertsButton: 'Get Alerts',
      pointType: 'point',
      lossFootnote: '* Tree cover loss ',
      customAnalysisText: 'To further refine your results go to ',
      customAnalysisLink: 'Custom Area',
      fullReportButton: 'Full Report',
      watershedSummeryInfo: 'Watershed Risk Summary'
    },
    controlPanel: {
      wriBasemap: 'WRI',
      imageryBasemap: 'Imagery'
    },
    modals: {
      noInfo: 'No Information Available',
      alerts: {
        title: 'Subscribe to GFW Alerts',
        descriptions: {
          email: 'Please enter your email address',
          subscription: 'Please name your subscription',
          subscriptionTypes: 'Please select your alert type(s)'
        }
      },
      canopy: {
        title: 'Adjust the minimum canopy density for tree cover  and tree cover loss',
        slider: [0, 10, 15, 20, 25, 30, 50, 75, 100]
      },
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
    // Fill in below so I can use the keys as Ids
    layerInformation: {}
  }

};

// Layer Information
// config.text.layerInformation[KEYS.wetlands] = {};
// config.text.layerInformation[KEYS.majorDams] = {};
// config.text.layerInformation[KEYS.waterIntake] = {};
// config.text.layerInformation[KEYS.sediment] = {};
// config.text.layerInformation[KEYS.waterStress] = {};

config.text.layerInformation[KEYS.treeCover] = {
  title: 'Tree Cover',
  subtitle: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
  table: [
    {label: 'Function', html: 'Identifies areas of tree cover'},
    {label: 'Resolution/Scale', html: '30 × 30 meters'},
    {label: 'Geographic Coverage', html: 'Global land (excluding Antarctica and Arctic islands)'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/" target="_blank">Landsat 7 ETM+</a>'},
    {label: 'Date of Content', html: '2000'},
    {label: 'Cautions', html: 'For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities.'}
  ],
  overview: [
    'This data set displays tree cover over all global land (except for Antarctica and a number of Arctic islands) for the year 2000 at 30 × 30 meter resolution. “Percent tree cover” is defined as the density of tree canopy coverage of the land surface and is color-coded by density bracket (see legend).',
    'Data in this layer were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/" target="_blank">Landsat 7 thematic mapper plus (ETM+)</a> sensor. The clear surface observations from over 600,000 images were analyzed using Google Earth Engine, a cloud platform for earth observation and data analysis, to determine per pixel tree cover using a supervised learning algorithm.'
  ],
  citation: [
    '<strong>Citation:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” <em>Science</em> 342 (15 November): 850–53. Data available on-line from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest" target="_blank">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.',
    '<strong>Suggested citation for data as displayed on GFW:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “Tree Cover.” University of Maryland, Google, USGS, and NASA. Accessed through Global Forest Watch on [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
};

config.text.layerInformation[KEYS.loss] = {
  title: 'Tree Cover Loss',
  subtitle: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
  table: [
    {label: 'Function', html: 'Identifies areas of gross tree cover loss'},
    {label: 'Resolution/Scale', html: '30 × 30 meters'},
    {label: 'Geographic Coverage', html: 'Global land (excluding Antarctica and Arctic islands)'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/index.php" target="_blank">Landsat</a>'},
    {label: 'Frequency of Updates', html: 'Annual'},
    {label: 'Date of Content', html: '2001–2014'},
    {label: 'Cautions', html: '<p>This data layer was updated in January 2015 to extend the tree cover loss analysis to 2013, and in August 2015 to extend the tree cover loss analysis to 2014. The updates include new data for the target year and re-processed data for the previous two years (2011 and 2012 for the 2013 update, 2012 and 2013 for the 2014 update). The re-processing increased the amount of change that could be detected, resulting in some changes in calculated tree cover loss for 2011-2013 compared to the previous versions. Calculated tree cover loss for 2001-2010 remains unchanged. The integrated use of the original 2001-2012 (Version 1.0) data and the updated 2011–2014 (Version 1.1) data should be performed with caution.</p><p>For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities. “Loss” indicates the removal or mortality of tree canopy cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation.</p><p>When zoomed out (&lt; zoom level 13), pixels of loss are shaded according to the density of loss at the 30 x 30 meter scale. Pixels with darker shading represent areas with a higher concentration of tree cover loss, whereas pixels with lighter shading indicate a lower concentration of tree cover loss. There is no variation in pixel shading when the data is at full resolution (≥ zoom level 13).</p>'}
  ],
  overview: [
    'This data set measures areas of tree cover loss across all global land (except Antarctica and other Arctic islands) at approximately 30 × 30 meter resolution. The data were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/about_landsat5.php" target="_blank">Landsat 5</a> thematic mapper (TM), the <a href="http://landsat.usgs.gov/science_L7_cpf.php" target="_blank">Landsat 7</a> thematic mapper plus (ETM+), and the <a href="" target="_blank">Landsat 8</a> Operational Land Imager (OLI) sensors. Over 1 million satellite images were processed and analyzed, including over 600,000 Landsat 7 images for the 2000-2012 interval, and approximately 400,000 Landsat 5, 7, and 8 images for updates for the 2011-2014 interval. The clear land surface observations in the satellite images were assembled and a supervised learning algorithm was applied to identify per pixel tree cover loss.',
    'Tree cover loss is defined as “stand replacement disturbance,” or the complete removal of tree cover canopy at the Landsat pixel scale. Tree cover loss may be the result of human activities, including forestry practices such as timber harvesting or deforestation (the conversion of natural forest to other land uses), as well as natural causes such as disease or storm damage. Fire is another widespread cause of tree cover loss, and can be either natural or human-induced.',
    '<strong>2015 Update (Version 1.1)</strong>',
    'This data set has been updated twice since its creation, and now includes loss up to 2014. The analysis method has been modified in numerous ways, and the update should be seen as part of a transition to a future “version 2.0” of this data set that is more consistent over the entire 2001 and onward period. Key changes include:',
    [
      'The use of Landsat 8 data for 2013-2014 and Landsat 5 data for 2011-2012',
      'The reprocessing of data from the previous two years in measuring loss (2011 and 2012 for the 2013 update, 2012 and 2013 for the 2014 update)',
      'Improved training data for calibrating the loss model',
      'Improved per sensor quality assessment models to filter input data',
      'Improved input spectral features for building and applying the loss model'
    ],
    'These changes lead to a different and improved detection of global tree cover loss. However, the years preceding 2011 have not yet been reprocessed with the revised analysis methods, and users will notice inconsistencies between versions 1.0 (2001-2012) and 1.1 (2011-2014) as a result. It must also be noted that a full validation of the results incorporating Landsat 8 has not been undertaken. Such an analysis may reveal a more sensitive ability to detect and map forest disturbance using Landsat 8 data. If this is the case then there will be a more fundamental limitation to the consistency of this data set before and after the inclusion of Landsat 8 data. Validation of Landsat 8-incorporated loss detection is planned.',
    'Some examples of improved change detection in the 2011–2014 update include the following:',
    [
      'Improved detection of boreal forest loss due to fire',
      'Improved detection of smallholder rotation agricultural clearing in dry and humid tropical forests',
      'Improved detection of selective logging'
    ],
    'These are examples of dynamics that may be differentially mapped over the 2011-2014 period in Version 1.1. A version 2.0 reprocessing of the 2001 and onward record is planned, but no delivery date is yet confirmed.',
    'The original version 1.0 data remains available for download <a href="http://earthenginepartners.appspot.com/science-2013-global-forest/download_v1.0.html" target="_blank">here</a>.'
  ],
  citation: [
    '<strong>Citation:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available online from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest" target="_blank">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.',
    '<strong>Suggested citation for data as displayed on GFW:</strong>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “Hansen/UMD/Google/USGS/NASA Tree Cover Loss and Gain Area.” University of Maryland, Google, USGS, and NASA. Accessed through Global Forest Watch on [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
};

config.text.layerInformation[KEYS.gain] = {
  title: 'Tree Cover Gain',
  subtitle: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
  table: [
    {label: 'Function', html: 'Identifies areas of tree cover gain'},
    {label: 'Resolution/Scale', html: '30 × 30 meters'},
    {label: 'Geographic Coverage', html: 'Global land (excluding Antarctica and Arctic islands)'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/" target="_blank">Landsat 7 ETM+</a>'},
    {label: 'Frequency of Updates', html: 'Every three years'},
    {label: 'Date of Content', html: '2001 - 2012'},
    {label: 'Cautions', html: '<p>For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities. “Loss” indicates the removal or mortality of tree canopy cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation.</p><p>When zoomed out (&lt; zoom level 13), pixels of gain are shaded according to the density of gain at the 30 x 30 meter scale. Pixels with darker shading represent areas with a higher concentration of tree cover gain, whereas pixels with lighter shading indicate a lower concentration of tree cover gain. There is no variation in pixel shading when the data is at full resolution (≥ zoom level 13).</p><p>A validation assessment of the 2000 – 2012 Hansen/UMD/Google/USGS/NASA change data was carried out independently from the mapping exercise at the global and biome (tropical, subtropical, temperate, and boreal) scale. A stratified random sample (for no change, loss, and gain) of 1500 blocks, each 120 × 120 meters, was used as validation data.  The amount of tree cover gain within each block was estimated using Landsat, MODIS, and Google Earth high-resolution imagery and compared to the map. Overall accuracies for gain were over 99.5% globally and for all biomes. However, since the overall accuracy calculations are positively skewed due to the high percentage of no change pixels, it is also important to assess the accuracy of the change predictions. The user’s accuracy (i.e. the percentage of pixels labelled as tree cover gain that actually gained tree cover) was 87.8% at the global level. At the biome level, user’s accuracies were 81.9%, 85.5%, 62.0%, and 76.7% for the tropical, subtropical, temperate, and boreal biomes, respectively.</p>'}
  ],
  overview: [
    'This data set measures areas of tree cover gain across all global land (except Antarctica and other Arctic islands) at 30 × 30 meter resolution, displayed as a 12-year cumulative layer. The data were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/science_L7_cpf.php" target="_blank">Landsat 7 thematic mapper plus (ETM+)</a> sensor. Over 600,000 Landsat 7 images were compiled and analyzed using Google Earth Engine, a cloud platform for earth observation and data analysis. The clear land surface observations (30 × 30 meter pixels) in the satellite images were assembled and a supervised learning algorithm was then applied to identify per pixel tree cover gain.',
    'Tree cover gain was defined as the establishment of tree canopy at the Landsat pixel scale in an area that previously had no tree cover. Tree cover gain may indicate a number of potential activities, including natural forest growth or the crop rotation cycle of tree plantations.'
  ],
  citation: [
    '<strong>Citation:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available on-line from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest" target="_blank">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.',
    '<strong>Suggested citations for data as displayed on GFW:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “Hansen/UMD/Google/USGS/NASA Tree Cover Loss and Gain Area.” University of Maryland, Google, USGS, and NASA. Accessed through Global Forest Watch on  [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
};

config.text.layerInformation[KEYS.activeFires] = {
  title: 'Firms Active Fires',
  subtitle: '(daily, 1km, global, NASA)',
  table: [
    {label: 'Function', html: 'Displays fire alert data for the past 7 days'},
    {label: 'Resolution/Scale', html: '1 × 1 kilometer'},
    {label: 'Geographic Coverage', html: 'Global'},
    {label: 'Source Data', html: '<a href="http://modis.gsfc.nasa.gov/about/" target="_blank">MODIS</a>'},
    {label: 'Date of Content', html: 'Past 7 days'},
    {label: 'Cautions', html: '<p>Not all fires are detected. There are several reasons why MODIS may not have detected a certain fire. The fire may have started and ended between satellite overpasses. The fire may have been too small or too cool to be detected in the (approximately) 1 km<sup>2</sup> pixel. Cloud cover, heavy smoke, or tree canopy may completely obscure a fire.</p><p>It is not recommended to use active fire locations to estimate burned area due to spatial and temporal sampling issues.</p><p>When zoomed out, this data layer displays some degree of inaccuracy because the data points must be collapsed to be visible on a larger scale. Zoom in for greater detail.</p>'}
  ],
  overview: [
    'The Fire Information for Resource Management System (FIRMS) delivers global MODIS-derived hotspots and fire locations. The active fire locations represent the center of a 1-kilometer pixel that is flagged by the MOD14/MYD14 Fire and Thermal Anomalies Algorithm as containing one or more fires within the pixel.',
    'The near real-time active fire locations are processed by the <a href="https://earthdata.nasa.gov/data/near-real-time-data" target="_blank">NASA Land and Atmosphere Near Real-Time Capability for EOS (LANCE)</a> using the standard MODIS Fire and Thermal Anomalies product (MOD14/MYD14). Data older than the past 7 days can be obtained from the <a href="https://earthdata.nasa.gov/data/near-real-time-data/firms/active-fire-data#tab-content-6" target="_blank">Archive Download Tool</a>. The tool provides near real-time data and, as it becomes available and is replaced with the standard NASA (MCD14ML) fire product.',
    'More information on active fire data is available from the <a href="https://earthdata.nasa.gov/data/near-real-time-data/firms" target="_blank">NASA FIRMS website</a>.'
  ],
  citation: [
    '<strong>Citation:</strong>NASA FIRMS. “NASA Fire Information for Resource Management System (FIRMS).” Accessed on [date]. <a href="earthdata.nasa.gov/data/near-real-time-data/firms" target="_blank">earthdata.nasa.gov/data/near-real-time-data/firms</a>.',
    '<strong>Suggested citation for data as displayed on GFW:</strong> “NASA Active Fires.” NASA FIRMS. Accessed through Global Forest Watch on [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
};

config.text.layerInformation[KEYS.burnScars] = {
  title: 'Burn Scars',
  table: [
    {label: 'Function', html: 'Provides an estimate of the extent of land burned by fire'},
    {label: 'Resolution/Scale', html: '30 meters'},
    {label: 'Geographic Coverage', html: 'Sumatra, Indonesia'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/index.php" target="_blank">Landsat</a>'},
    {label: 'Date of Content', html: 'May 1, 2014 - present'},
    {label: 'Cautions', html: 'This data layer is provided as a beta analysis product and should be used for visual purposes only.'}
  ],
  overview: [
    'This data layer provides the extent of burn land area, or burn scars, mapped from Landsat satellite imagery, using Google Earth Engine. This analysis was conducted by the Data Lab team (Robin Kraft, Dan Hammer, and Aaron Steele) of the World Resources Institute using Google Earth Engine. This analysis will be updated regularly as additional Landsat imagery becomes available.',
    'This analysis was conducted as an open source project; code is available here:<br><a href="https://gist.github.com/robinkraft/077c14d35a50a8b31581" target="_blank">https://gist.github.com/robinkraft/077c14d35a50a8b31581</a>'
  ],
  citation: [
    '<strong>Citation:</strong>Elvidge, Christopher D. and Kimberly Baugh. 2014. Burn scar mapping from Landsat 8. Presentation at APAN meeting in Bandung, Indonesia. January 20.',
    '<strong>URL:</strong><a href="http://www.apan.net/meetings/Bandung2014/Sessions/EM/Elvidge_L8_burnscar_20140120.pdf" target="_blank">http://www.apan.net/meetings/Bandung2014/Sessions/EM/Elvidge_L8_burnscar_20140120.pdf</a>.'
  ]
};

// Exports
export const layerPanelText = config.text.layerPanel;
export const analysisPanelText = config.text.analysisPanel;
export const controlPanelText = config.text.controlPanel;
export const modalText = config.text.modals;
export const assetUrls = config.assets;
export const layersConfig = config.layers;
export const errors = config.text.errors;
export const mapConfig = config.map;
export const symbolConfig = config.symbol;
export const layerInformation = config.text.layerInformation;
export const alertsModalConfig = config.alertsModal;
