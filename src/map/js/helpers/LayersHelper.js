import {analysisActions} from 'actions/AnalysisActions';
import {layerActions} from 'actions/LayerActions';
import {modalActions} from 'actions/ModalActions';
import {layerPanelText, layersConfig} from 'js/config';
import InfoTemplate from 'esri/InfoTemplate';
import dojoQuery from 'dojo/query';
import on from 'dojo/on';
import GraphicsHelper from 'helpers/GraphicsHelper';
import rasterFuncs from 'utils/rasterFunctions';
import {analysisStore} from 'stores/AnalysisStore';
import {modalStore} from 'stores/ModalStore';
import {mapStore} from 'stores/MapStore';
import Symbols from 'helpers/Symbols';
import Request from 'utils/request';
import utils from 'utils/AppUtils';
import KEYS from 'js/constants';

let timer;

let LayersHelper = {

  connectLayerEvents () {
    brApp.debug('LayersHelper >>> connectLayerEvents');
    // Enable Mouse Events for all graphics layers
    brApp.map.graphics.enableMouseEvents();
    // Get the watershed layer and add mouse events to it
    let watershedLayer = brApp.map.getLayer(KEYS.watershed);
    if (watershedLayer) {
      watershedLayer.on('mouse-over', LayersHelper.watershedHoverOn);
      watershedLayer.on('mouse-out', LayersHelper.watershedHoverOff);
      watershedLayer.on('click', LayersHelper.watershedClicked);
      //- Testing to see if this stops the request cancelled errors in the console
      watershedLayer.on('zoom-start', () => { watershedLayer.setVisibility(false); });
      watershedLayer.on('zoom-end', () => { watershedLayer.setVisibility(true); });
    }
    let caseStudies = brApp.map.getLayer(KEYS.caseStudies);
    if (caseStudies) {
      caseStudies.on('click', LayersHelper.caseStudiesClicked);
    }
    let smallGrants = brApp.map.getLayer(KEYS.smallGrants);
    if (smallGrants) {
      smallGrants.on('click', LayersHelper.smallGrantsClicked);
    }

    brApp.map.on('click', evt => {
      if (!evt.graphic) {
        brApp.map.infoWindow.hide();
      }
    });
  },

  watershedClicked (evt) {
    brApp.debug('LayerHelper >>> watershedClicked');

    function executeHandler () {
      //- Don't do anything if the drawtoolbar is active
      let {activeWatershed, toolbarActive} = analysisStore.getState();
      let graphic = evt.graphic;
      let layer = brApp.map.getLayer(KEYS.watershed);
      if (graphic && !toolbarActive) {
        //- If we currently have a feature in analysis, clear the analyis, then run the query
        if (activeWatershed) { analysisActions.clearActiveWatershed(); }
        // Get a reference to the objectid field
        let oidField = layer.objectIdField;
        let objectid = graphic.attributes[oidField];
        Request.getWatershedById(objectid).then(featureJSON => {
          //- Convert JSON to feature
          let feature = GraphicsHelper.makePolygon(featureJSON);
          //- Start the analysis process
          analysisActions.analyzeCurrentWatershed(feature);
          brApp.map.setExtent(feature.geometry.getExtent(), true);
        }, err => {
          console.log(err);
        });
      }
    }

    //- Bail if this is followed by another click within 250ms
    //- DblClicks should zoom in as that is the default behavior on a map, but single clicks should
    //- trigger this feature
    if (timer) {
      window.clearTimeout(timer);
      timer = undefined;
    } else {
      timer = setTimeout(() => {
        //- reset timer
        timer = undefined;
        executeHandler();
      }, 250);
    }
  },

  watershedHoverOn (evt) {
    // brApp.debug('LayersHelper >>> watershedHoverOn');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedHoverSymbol());
    }
  },

  watershedHoverOff (evt) {
    // brApp.debug('LayersHelper >>> watershedHoverOff');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedDefaultSymbol());
    }
  },

  caseStudiesClicked (evt) {
    brApp.debug('LayerHelper >>> caseStudiesClicked');
    // brApp.map.infoWindow.hide();
    brApp.map.infoWindow.clearFeatures();
    //- Don't do anything if the drawtoolbar is active
    let {toolbarActive} = analysisStore.getState();
    let graphic = evt.graphic;
    let closeHandles = [];

    if (graphic && !toolbarActive) {
      let content = '<div id="popup-content"><p class="cases-title">' + graphic.attributes.Location + '</p><p class="field-value">' + graphic.attributes.Learn_More + '</p>' +
        '<p class="field-value popup-link"><a href=' + graphic.attributes.url + ' target="_blank">read more</a></p>' +
        '<div title="close" class="infoWindow-close close-icon"><svg viewBox="0 0 100 100"><use xlink:href="#shape-close" /></use></svg></div></div>';
      let template = new InfoTemplate(graphic.attributes.Location, content);

      graphic.setInfoTemplate(template);
      brApp.map.infoWindow.setFeatures(graphic);
      brApp.map.infoWindow.show(evt.mapPoint);
      on(brApp.map.infoWindow, 'selection-change', () => {
        if (brApp.map.infoWindow.features) {
          dojoQuery('.infoWindow-close').forEach((rowData) => {
            var handle = on(rowData, 'click', function() {
              brApp.map.infoWindow.hide();
            });
            closeHandles.push(handle);
          });
          on(brApp.map.infoWindow, 'hide', function() {
            closeHandles.forEach(handleFunction => {
              handleFunction.remove();
            });
          });
        }
      });

    }
  },

  smallGrantsClicked (evt) {
    brApp.debug('LayerHelper >>> smallGrantsClicked');
    // brApp.map.infoWindow.hide();
    brApp.map.infoWindow.clearFeatures();
    //- Don't do anything if the drawtoolbar is active
    let {toolbarActive} = analysisStore.getState();
    let graphic = evt.graphic;
    let closeHandles = [];

    if (graphic && !toolbarActive) {
      let content = '<div id="popup-content"><p class="cases-title">' + graphic.attributes.Project + '</p>' +
        '<div class="field-value grants"><img class="popup-image" src=' + graphic.attributes.Image + ' /></div>' +
        '<p class="field-value grants">' + graphic.attributes.Location + '</p>' +
        '<p class="field-value grants">Partner: ' + graphic.attributes.CSO + '</p>' +
        '<p class="field-value grants">' + graphic.attributes.Description + '</p>' +
        '<div title="close" class="infoWindow-close close-icon"><svg viewBox="0 0 100 100"><use xlink:href="#shape-close" /></use></svg></div></div>';
      let template = new InfoTemplate(graphic.attributes.Project, content);

      graphic.setInfoTemplate(template);
      brApp.map.infoWindow.setFeatures(graphic);
      brApp.map.infoWindow.show(evt.mapPoint);
      on(brApp.map.infoWindow, 'selection-change', () => {
        if (brApp.map.infoWindow.features) {
          dojoQuery('.infoWindow-close').forEach((rowData) => {
            var handle = on(rowData, 'click', function() {
              brApp.map.infoWindow.hide();
            });
            closeHandles.push(handle);
          });
          on(brApp.map.infoWindow, 'hide', function() {
            closeHandles.forEach(handleFunction => {
              handleFunction.remove();
            });
          });
        }
      });

    }
  },

  /**
  * @param {string} layerId - id of layer to show
  */
  showLayer (layerId) {
    brApp.debug(`LayersHelper >>> showLayer - ${layerId}`);
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.show(); }

    // If the layer is the potential forest layer (historic loss) and tree cover is not on
    // show a dialog and ask about the tree cover layer
    let {lossCookieValue} = modalStore.getState();
    let {activeLayers} = mapStore.getState();
    if (layerId === KEYS.historicLoss && activeLayers.indexOf(KEYS.treeCover) === -1) {
      if (!lossCookieValue) {
        modalActions.showHistoricLossModal();
      } else if (lossCookieValue === KEYS.lossCookieShow) {
        layerActions.addActiveLayer(KEYS.treeCover);
      }
    }
  },
  /**
  * @param {string} layerId - id of layer to hide
  */
  hideLayer (layerId) {
    brApp.debug(`LayersHelper >>> hideLayer - ${layerId}`);
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.hide(); }
  },

  /**
  * @param {string} basemap - id of basemap to show
  */
  changeBasemap (basemap) {
    brApp.debug(`MapActions >>> changeBasemap - ${basemap}`);
    let layer, labelLayer, baseLayer;
    // Basemap can only be one of two options, wri or satellite
    if (basemap === KEYS.wriBasemap) {
      layer = brApp.map.getLayer(basemap);
      labelLayer = brApp.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.show(); }
      if (labelLayer) { labelLayer.show(); }
      // Remove the satellite layer if its present, wri-basemap should be first in layer ids,
      // if not, then the first layer is satellite
      if (brApp.map.layerIds[0] !== basemap) {
        baseLayer = brApp.map.getLayer(brApp.map.layerIds[0]);
        brApp.map.removeLayer(baseLayer);
      }
    } else {
      // Hide the wri basemap and show the satellite basemap, KEYS.wriBasemap
      brApp.map.setBasemap(basemap);
      layer = brApp.map.getLayer(KEYS.wriBasemap);
      labelLayer = brApp.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.hide(); }
      if (labelLayer) { labelLayer.hide(); }
    }
  },
  /**
  * @param {number} optionIndex - Index of the selected option in the UI, see js/config
  * @param {boolean} dontRefresh - Whether or not to not fetch a new image
  */
  updateFiresLayerDefinitions (optionIndex, dontRefresh) {
    brApp.debug('LayersHelper >>> updateFiresLayerDefinitions');
    let value = layerPanelText.firesOptions[optionIndex].value || 1; // 1 is the default value, means last 24 hours
    let queryString = this.generateFiresQuery(value);
    let firesLayer = brApp.map.getLayer(KEYS.activeFires);
    let defs = [];

    if (firesLayer) {
      firesLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
      firesLayer.setLayerDefinitions(defs, dontRefresh);
    }
  },

  /**
  * @param {number} fromIndex - selected index of first tree cover loss select
  * @param {number} toIndex - selected index of second tree cover loss select
  * @param {number} canopyDensity - current selected tree cover canopy density
  */
  updateLossLayerDefinitions (fromIndex, toIndex, canopyDensity) {
    brApp.debug('LayersHelper >>> updateLossLayerDefinitions');
    let fromValue = +layerPanelText.lossOptions[fromIndex].label;
    let toValue = +layerPanelText.lossOptions[toIndex].label;
    let rasterFunction = rasterFuncs.getLossFunction(fromValue, toValue, canopyDensity);
    let layer = brApp.map.getLayer(KEYS.loss);

    if (layer) {
      layer.setRenderingRule(rasterFunction);
    }
  },

  /**
  * Does not need to be called multiple times, just when the layer is loaded
  */
  setLossLayerInterpolation () {
    brApp.debug('LayersHelper >>> updateLossLayerDefinitions');
    let layerConfig = utils.getObject(layersConfig, 'id', KEYS.loss);
    let layer = brApp.map.getLayer(KEYS.loss);

    if (layer) {
      layer.setInterpolation(layerConfig.interpolation);
    }
  },

  /**
  * @param {number} densityValue - Tree cover density value from slider, must be between 1 and 100
  */
  updateTreeCoverDefinitions (densityValue) {
    brApp.debug('LayersHelper >>> updateTreeCoverDefinitions');
    let layerConfig = utils.getObject(layersConfig, 'id', KEYS.treeCover);
    let rasterFunction = rasterFuncs.getColormapRemap(layerConfig.colormap, [densityValue, layerConfig.inputRange[1]], layerConfig.outputRange);
    let layer = brApp.map.getLayer(KEYS.treeCover);

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
    brApp.debug('LayersHelper >>> generateFiresQuery');
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
