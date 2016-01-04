import WebTiledLayer from 'esri/layers/WebTiledLayer';
import layerFactory from 'helpers/LayerFactory';
import LayersHelper from 'helpers/LayersHelper';
import {layersConfig, errors} from 'js/config';
import Point from 'esri/geometry/Point';
import Symbols from 'helpers/Symbols';
import Deferred from 'dojo/Deferred';
import Graphic from 'esri/graphic';
import KEYS from 'js/constants';
import EsriMap from 'esri/map';
import alt from 'js/alt';

// Variable to hold the user location graphic, this is deinfed here to make it
// easier to remove at a later point
let userLocation;

class MapActions {

  /**
  * @param {object} mapconfig - May not be the same mapConfig from above, it is initially but map options
  * may be merged into this in the Map component on app load, if url params are present
  */
  createMap (mapconfig) {
    brApp.debug('MapActions >>> createMap');
    let deferred = new Deferred();
    brApp.map = new EsriMap(mapconfig.id, mapconfig.options);
    brApp.map.on('load', () => {
      // Clear out the phantom graphic that esri adds to the graphics layer before resolving
      brApp.map.graphics.clear();
      deferred.resolve();
    });
    // Add a custom web tiled layer as a basemap
    let customBasemap = new WebTiledLayer(mapconfig.customBasemap.url, mapconfig.customBasemap.options);
    brApp.map.addLayers([customBasemap]);
    return deferred;
  }

  createLayers () {
    brApp.debug('MapActions >>> createLayers');
    //- Remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    let layers = layersConfig.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    brApp.map.addLayers(layers);
    // If there is an error with a particular layer, handle that here
    brApp.map.on('layers-add-result', result => {
      let addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      // Connect events to the layers that need them
      LayersHelper.connectLayerEvents();
    });
  }

  zoomToUserLocation () {
    brApp.debug('MapActions >>> zoomToUserLocation');
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(geoposition => {
        let coords = geoposition.coords;
        // If there is alerady a location graphic present, remove it
        if (userLocation) { brApp.map.graphics.remove(userLocation); }
        // Add a graphic to the map and zoom to it
        userLocation = new Graphic(new Point([coords.longitude, coords.latitude]), Symbols.getSVGPointSymbol(), { id: 'userLocation' });
        brApp.map.centerAndZoom(userLocation.geometry, 18);
        brApp.map.graphics.add(userLocation);
      }, err => {
        alert(errors.geolocationFailure(err.message));
      });
    } else {
      alert(errors.geolocationUnavailable);
    }
  }

  toggleBasemapGallery (status) {
    brApp.debug('MapActions >>> toggleBasemapGallery');
    this.dispatch(status);
  }

  toggleControls (status) {
    brApp.debug('MapActions >>> toggleControls');
    this.dispatch(status);
  }

  setBasemap (basemap) {
    brApp.debug(`MapActions >>> setBasemap - ${basemap}`);
    this.dispatch(basemap);
  }

  setLabelLayer (labelLayerId) {
    brApp.debug(`MapActions >>> setLabelLayer - ${labelLayerId}`);
    this.dispatch(labelLayerId);
  }

  /**
  * NOTE: DEPRECATED
  */
  // reset () {
  //   brApp.debug('MapActions >>> reset');
  //   // Reset the Store, this will also reset layers, layer definitions, and all React components
  //   alt.recycle();
  //   // Reset the Canopy Density slider
  //   var slider = $('#tree-cover-slider').data('ionRangeSlider');
  //   if (slider) { slider.reset(); }
  //   //- Reset Esris Search Dijit and clear any graphics
  //   analysisActions.clearCustomArea();
  //   analysisActions.clearActiveWatershed();
  //   //- Reset the Map to its original zoom and location
  //   brApp.map.centerAndZoom(mapConfig.options.center, mapConfig.options.zoom);
  // }

  /**
  * Use apply-edits to save a feature to a feature layer and proxy results back through callback
  * @param {Feature} feature - esri feature to be saved/updated
  * @return {deferred} deferred
  */
  saveFeature (feature) {
    brApp.debug('MapActions >>> saveFeature');
    let featureLayer = brApp.map.getLayer(KEYS.customAreaFeatures);
    let deferred = new Deferred();
    if (!featureLayer) { deferred.reject(); return deferred; }
    featureLayer.applyEdits([feature], null, null, (res) => {
      deferred.resolve(res);
    }, (err) => { deferred.reject(err); });
    return deferred;
  }

}

export const mapActions = alt.createActions(MapActions);
