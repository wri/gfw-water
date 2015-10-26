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
  * Clear features from the map
  * TODO: If the need to remove individual features arises, add a ids param to this
  * and if present, remove only that feature, otherwise remove all
  */
  clearFeatures: () => {
    app.map.graphics.clear();
  }

};

export { graphicsHelper as default };
