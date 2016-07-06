/**
* NOTE: KEYS must be unique
*/
const KEYS = {
  //- Basemaps
  wriBasemap: 'wri-basemap',
  imageryBasemap: 'satellite',
  wriBasemapLabel: 'wri-basemap-label',
  //- Layers and Layer Categories
  fires: 'fires',
  treeCoverChange: 'tcc',
  waterStress: 'water-stress',
  caseStudies: 'case-studies',
  majorDams: 'dams',
  activeFires: 'active-fires',
  burnScars: 'burn-scars',
  sediment: 'sediment',
  arid: 'arid',
  loss: 'loss',
  gain: 'gain',
  waterIntake: 'intake',
  treeCover: 'tree-cover',
  wetlands: 'wetlands',
  historicLoss: 'historic-loss',
  landCover: 'land-cover',
  //- Layers not in UI
  watershed: 'watersheds',
  rivers: 'rivers',
  adminLabels: 'adminLabels',
  watershedAnalysis: 'watershedAnalysis',
  customAnalysis: 'customAnalysis',
  customAreaFeatures: 'customAreaFeatures',
  //- Miscellaneous keys
  watershedChartId: 'watershed-chart',
  customAreaChartId: 'custom-area-chart',
  lossCookieShow: 'show',
  lossCookieHide: 'hide',
  //- Google Analytics keys
  analyticsCategory: 'Map',
  analyticsToggleAction: 'Toggle',
  analyticsAnalysisAction: 'Analysis',
  analyticsSettingsAction: 'Settings'
};

export { KEYS as default };
