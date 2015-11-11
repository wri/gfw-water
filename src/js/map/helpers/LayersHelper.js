import {analysisActions} from 'actions/AnalysisActions';
import {layerPanelText, layersConfig} from 'js/config';
import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisStore} from 'stores/AnalysisStore';
import rasterFuncs from 'utils/rasterFunctions';
import Symbols from 'helpers/Symbols';
import Request from 'utils/request';
import utils from 'utils/AppUtils';
import KEYS from 'js/constants';

let LayersHelper = {

  connectLayerEvents () {
    app.debug('LayersHelper >>> connectLayerEvents');
    // Enable Mouse Events for al graphics layers
    app.map.graphics.enableMouseEvents();
    // Get the watershed layer and add mouse events to it
    let watershedLayer = app.map.getLayer(KEYS.watershed);
    if (watershedLayer) {
      watershedLayer.on('mouse-over', LayersHelper.watershedHoverOn);
      watershedLayer.on('mouse-out', LayersHelper.watershedHoverOff);
      watershedLayer.on('click', LayersHelper.watershedClicked);
      //- Testing to see if this stops the request cancelled errors in the console
      watershedLayer.on('zoom-start', () => { watershedLayer.setVisibility(false); });
      watershedLayer.on('zoom-end', () => { watershedLayer.setVisibility(true); });
    }
  },

  watershedClicked (evt) {
    app.debug('LayerHelper >>> watershedClicked');
    //- Don't do anything if the drawtoolbar is active
    let {activeWatershed, toolbarActive} = analysisStore.getState();
    let graphic = evt.graphic;
    if (graphic && !toolbarActive) {
      //- If we currently have a feature in analysis, clear the analyis, then run the query
      if (activeWatershed) { analysisActions.clearActiveWatershed(); }
      let objectid = graphic.attributes.objectid;
      Request.getWatershedById(objectid).then(featureJSON => {
        //- Convert JSON to feature
        let feature = GraphicsHelper.makePolygon(featureJSON);
        //- Start the analysis process
        analysisActions.analyzeCurrentWatershed(feature);
        app.map.setExtent(feature.geometry.getExtent(), true);
      }, err => {
        console.log(err);
      });
    }
  },

  watershedHoverOn (evt) {
    // app.debug('LayersHelper >>> watershedHoverOn');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedHoverSymbol());
    }
  },

  watershedHoverOff (evt) {
    // app.debug('LayersHelper >>> watershedHoverOff');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedDefaultSymbol());
    }
  },

  /**
  * @param {string} layerId - id of layer to show
  */
  showLayer (layerId) {
    app.debug(`LayersHelper >>> showLayer - ${layerId}`);
    let layer = app.map.getLayer(layerId);
    if (layer) { layer.show(); }
  },
  /**
  * @param {string} layerId - id of layer to hide
  */
  hideLayer (layerId) {
    app.debug(`LayersHelper >>> hideLayer - ${layerId}`);
    let layer = app.map.getLayer(layerId);
    if (layer) { layer.hide(); }
  },

  /**
  * @param {number} optionIndex - Index of the selected option in the UI, see js/config
  * @param {boolean} dontRefresh - Whether or not to not fetch a new image
  */
  updateFiresLayerDefinitions (optionIndex, dontRefresh) {
    app.debug('LayersHelper >>> updateFiresLayerDefinitions');
    let value = layerPanelText.firesOptions[optionIndex].value || 1; // 1 is the default value, means last 24 hours
    let queryString = this.generateFiresQuery(value);
    let firesLayer = app.map.getLayer(KEYS.activeFires);
    let defs = [];

    if (firesLayer) {
      firesLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
      firesLayer.setLayerDefinitions(defs, dontRefresh);
    }
  },

  /**
  * @param {number} fromIndex - selected index of first tree cover loss select
  * @param {number} toIndex - selected index of second tree cover loss select
  */
  updateLossLayerDefinitions (fromIndex, toIndex) {
    app.debug('LayersHelper >>> updateLossLayerDefinitions');
    let fromValue = layerPanelText.lossOptions[fromIndex].value;
    let toValue = layerPanelText.lossOptions[toIndex].value;
    let layerConfig = utils.getObject(layersConfig, 'id', KEYS.loss);
    //- [fromValue, toValue] is inclusive, exclusive, which is why the + 1 is present
    let rasterFunction = rasterFuncs.getColormapRemap(layerConfig.colormap, [fromValue, (toValue + 1)], layerConfig.outputRange);
    let layer = app.map.getLayer(KEYS.loss);

    if (layer) {
      layer.setRenderingRule(rasterFunction);
    }
  },

  /**
  * @param {number} densityValue - Tree cover density value from slider, must be between 1 and 100
  */
  updateTreeCoverDefinitions (densityValue) {
    app.debug('LayersHelper >>> updateTreeCoverDefinitions');
    let layerConfig = utils.getObject(layersConfig, 'id', KEYS.treeCover);
    let rasterFunction = rasterFuncs.getColormapRemap(layerConfig.colormap, [densityValue, layerConfig.inputRange[1]], layerConfig.outputRange);
    let layer = app.map.getLayer(KEYS.treeCover);

    if (layer) {
      layer.setRenderingRule(rasterFunction);
    }
  },

  /**
  * Generate a date query for active fires layers
  * @param {number} filterValue - Numeric value representing the number of days to show in the output query
  * @return {string} Query String to use for Fires Filter
  */
  generateFiresQuery (filterValue) {
    app.debug('LayersHelper >>> generateFiresQuery');
    // The service only has data for the last week, so if filter is 7 days, just set to 1 = 1
    if (filterValue >= 7) {
      return '1 = 1';
    }

    let date = new Date();
    // Set the date to filterValue amount of days before today
    date.setDate(date.getDate() - filterValue);
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return 'ACQ_DATE > date \'' + dateString + '\'';
  }

};

export { LayersHelper as default };
