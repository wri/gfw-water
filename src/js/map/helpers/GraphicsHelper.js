import SpatialReference from 'esri/SpatialReference';
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
  * Add a point to the map from the draw tool, or any valid point geometry
  * @param {object} geometry - Esri Point geometry
  */
  addPoint: geometry => {
    app.map.graphics.add(new Graphic(
      geometry,
      Symbols.getPointSymbol()
    ));
  },

  /**
  * Add a point to the map from the lat/lon inputs, or any valid lat/lon
  * @param {number} lat - Valid latitude between -90 and 90
  * @param {number} lon - Valid longitude between -180 and 180
  * @return {point} point - return an esri point object that can be used for future methods
  */
  addPointFromLatLng: (lat, lon) => {
    let point = new Point(lon, lat);
    graphicsHelper.addPoint(point);
    return point;
  },

  /**
  * Generate a Graphic from the provided feature JSON
  * @param {object} feature - must have geometry and should have attributes
  * @return {Graphic} - return an Esri Graphic object that can be used for future methods
  */
  generateGraphic: feature => {
    if (!feature.geometry.spatialReference) { feature.geometry.spatialReference = { wkid: 102100 }; }
    return new Graphic(
      new Polygon(feature.geometry),
      null, //- No symbol necessary
      feature.attributes || {}
    );
  },

  /**
  * Clear features from the map
  * TODO: If the need to remove individual features arises, add a ids param to this
  * and if present, remove only that feature, otherwise remove all
  */
  clearFeatures: () => {
    app.map.graphics.clear();
  }

};

export { graphicsHelper as default };
