import Polygon from 'esri/geometry/Polygon';
import Point from 'esri/geometry/Point';
import Symbols from 'helpers/Symbols';
import Graphic from 'esri/graphic';

const graphicsHelper = {
  /**
  * Add a feature to the map for the purpose of showing an active watershed for analysis
  * @param {Graphic} feature - Esri Feature object returned from a query
  */
  addActiveWatershed: feature => {
    app.map.graphics.add(new Graphic(
      feature.geometry,
      Symbols.getWatershedHoverSymbol(),
      feature.attributes
    ));
  },

  /**
  * Add upstream watershed to the map
  * @param {Feature} feature - Esri feature returned from GeoProcessor.submitJob
  */
  addUpstreamGraphic: feature => {
    app.map.graphics.add(new Graphic(
      feature.geometry,
      Symbols.getUpstreamSymbol(),
      feature.attributes
    ));
  },

  /**
  * Add a point to the map from the draw tool, or any valid point geometry
  * @param {object} geometry - Esri Point geometry
  */
  addPoint: geometry => {
    app.map.graphics.add(new Graphic(
      geometry,
      Symbols.getSVGPointSymbol()
    ));
  },

  /**
  * Generate a point from the lat/lon inputs, or any valid lat/lon
  * @param {number} lat - Valid latitude between -90 and 90
  * @param {number} lon - Valid longitude between -180 and 180
  * @return {point} point - return an esri point object that can be used for future methods
  */
  generatePointFromLatLng: (lat, lon) => {
    return new Point(lon, lat);
  },

  /**
  * Generate a Graphic from the provided feature JSON
  * @param {object} feature - must have geometry and should have attributes
  * @return {Graphic} - return an Esri Graphic object that can be used for future methods
  */
  generatePolygonGraphic: feature => {
    if (!feature.geometry.spatialReference) { feature.geometry.spatialReference = { wkid: 102100 }; }
    return new Graphic(
      new Polygon(feature.geometry),
      null, //- No symbol necessary
      feature.attributes || {}
    );
  },

  /**
  * Generate a Graphic from the provided feature JSON
  * @param {object} feature - must have geometry and should have attributes
  * @return {Graphic} - return an Esri Graphic object that can be used for future methods
  */
  generatePointGraphic: (geometry, attributes) => {
    return new Graphic(
      new Point(geometry),
      Symbols.getSVGPointSymbol(),
      attributes || null
    );
  },

  /**
  * Clear features from the map
  * TODO: If the need to remove individual features arises, add a ids param to this
  * and if present, remove only that feature, otherwise remove all
  */
  clearFeatures: () => {
    // Need to clear the appropriate graphics layer, will need to add one as well
    app.map.graphics.clear();
  }

};

export { graphicsHelper as default };
