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

  createMap (mapConfig) {
    app.debug('MapActions >>> createMap');
    let deferred = new Deferred();
    app.map = new EsriMap(mapConfig.id, mapConfig.options);
    app.map.on('load', () => {
      // Clear out the phantom graphic that esri adds to the graphics layer before resolving
      app.map.graphics.clear();
      deferred.resolve();
    });
    // Add a custom web tiled layer as a basemap
    let customBasemap = new WebTiledLayer(mapConfig.customBasemap.url, mapConfig.customBasemap.options);
    app.map.addLayers([customBasemap]);
    return deferred;
  }

  createLayers () {
    app.debug('MapActions >>> createLayers');
    let layersToAdd = layersConfig.filter(layer => layer && layer.url);
    // Generate a list of layers and add it to the map
    let layers = layersToAdd.map(layerFactory);
    app.map.addLayers(layers);
    // If there is an error with a particular layer, handle that here
    app.map.on('layers-add-result', result => {
      let addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      // Connect events to the layers that need them
      LayersHelper.connectLayerEvents();
      // Reorder some layers here
      let baselineWaterStressLayer = app.map.getLayer(KEYS.waterStress);
      app.map.reorderLayer(baselineWaterStressLayer, 1);
    });
  }

  zoomToUserLocation () {
    app.debug('MapActions >>> zoomToUserLocation');
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(geoposition => {
        let coords = geoposition.coords;
        // If there is alerady a location graphic present, remove it
        if (userLocation) { app.map.graphics.remove(userLocation); }
        // Add a graphic to the map and zoom to it
        userLocation = new Graphic(new Point([coords.longitude, coords.latitude]), Symbols.getSVGPointSymbol(), { id: 'userLocation' });
        app.map.centerAndZoom(userLocation.geometry, 18);
        app.map.graphics.add(userLocation);
      }, err => {
        alert(errors.geolocationFailure(err.message));
      });
    } else {
      alert(errors.geolocationUnavailable);
    }
  }

  setBasemap (basemap) {
    this.dispatch(basemap);
  }

  changeBasemap (basemap) {
    app.debug(`MapActions >>> setBasemap - ${basemap}`);
    let layer, labelLayer, baseLayer;
    // Basemap can only be one of two options, wri or satellite
    if (basemap === KEYS.wriBasemap) {
      layer = app.map.getLayer(basemap);
      labelLayer = app.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.show(); }
      if (labelLayer) { labelLayer.show(); }
      // Remove the satellite layer if its present, wri-basemap should be first in layer ids,
      // if not, then the first layer is satellite
      if (app.map.layerIds[0] !== basemap) {
        baseLayer = app.map.getLayer(app.map.layerIds[0]);
        app.map.removeLayer(baseLayer);
      }
    } else {
      // Hide the wri basemap and show the satellite basemap, KEYS.wriBasemap
      app.map.setBasemap(basemap);
      layer = app.map.getLayer(KEYS.wriBasemap);
      labelLayer = app.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.hide(); }
      if (labelLayer) { labelLayer.hide(); }
    }
  }

  reset () {
    app.debug('MapActions >>> reset');
    // Reset the Store, this will also reset layers, layer definitions, and all React components
    alt.recycle();
    // Reset the Canopy Density slider
    var slider = $('#tree-cover-slider').data('ionRangeSlider');
    if (slider) { slider.reset(); }
  }

}

export const mapActions = alt.createActions(MapActions);
