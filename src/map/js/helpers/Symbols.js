import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import {symbolConfig} from 'js/config';
import KEYS from 'js/constants';
import Color from 'esri/Color';

let watershedHoverSymbol,
    watershedDefaultSymbol,
    svgMarkerSymbol,
    upstreamSymbol,
    pointSymbol;

const Symbols = {

  getWatershedHoverSymbol: () => {
    if (watershedHoverSymbol) { return watershedHoverSymbol; }
    watershedHoverSymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color(symbolConfig.gfwBlue), 3),
      new Color([210, 210, 210, 0.0])
    );
    return watershedHoverSymbol;
  },

  getUpstreamSymbol: () => {
    if (upstreamSymbol) { return upstreamSymbol; }
    upstreamSymbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color(symbolConfig.upstreamSymbol), 2),
      new Color([210, 210, 210, 0.0])
    );
    return upstreamSymbol;
  },

  getWatershedDefaultSymbol: () => {
    if (watershedDefaultSymbol) { return watershedDefaultSymbol; }
    // Get a reference to the default symbol for this layer
    let watershedLayer = brApp.map.getLayer(KEYS.watershed);
    watershedDefaultSymbol = watershedLayer.renderer.getSymbol();
    return watershedDefaultSymbol;
  },

  getSVGPointSymbol: () => {
    if (svgMarkerSymbol) { return svgMarkerSymbol; }
    svgMarkerSymbol = new SimpleMarkerSymbol();
    svgMarkerSymbol.setPath(symbolConfig.svgPath);
    svgMarkerSymbol.setColor(new Color(symbolConfig.gfwBlue));
    svgMarkerSymbol.setOutline(null);
    svgMarkerSymbol.setSize(24);
    return svgMarkerSymbol;
  },

  getGrantsPointSymbol: () => {
    if (svgMarkerSymbol) { return svgMarkerSymbol; }
    svgMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 8,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([128, 128, 128]), 1),
    new Color([25, 29, 50, 0.75]));
    return svgMarkerSymbol;
  },

  getPointSymbol: () => {
    if (pointSymbol) { return pointSymbol; }
    pointSymbol = new PictureMarkerSymbol({
      url: symbolConfig.pointUrl,
      xoffset: 6,
      yoffset: 6,
      height: 27, //approx 36px
      width: 27
    });
    return pointSymbol;
  }

};

export { Symbols as default };
