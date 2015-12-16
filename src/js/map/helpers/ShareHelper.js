import {layerActions} from 'actions/LayerActions';
import {mapActions} from 'actions/MapActions';
import {mapStore} from 'stores/MapStore';
import * as params from 'utils/params';
import KEYS from 'js/constants';

const ShareHelper = {

  applyStateFromUrl (state) {
    let {activeLayers, activeBasemap, x, y, z} = state;

    if (activeLayers) {
      let layerIds = activeLayers.split(',');
      layerIds.forEach(id => {
        layerActions.addActiveLayer(id);
      });

      // Loss is on by default, we need to turn it off if not present in the shared state
      if (layerIds.indexOf(KEYS.loss) === -1) {
        layerActions.removeActiveLayer(KEYS.loss);
      }

      // Gain is on by default, we need to turn it off if not present in the shared state
      if (layerIds.indexOf(KEYS.gain) === -1) {
        layerActions.removeActiveLayer(KEYS.gain);
      }
    }

    if (activeBasemap) {
      mapActions.setBasemap(activeBasemap);
    }

    if (brApp.map.loaded && (x && y && z)) {
      brApp.map.centerAndZoom([x, y], z);
    }

  },

  prepareStateForUrl () {
    let {activeLayers, activeBasemap} = mapStore.getState();
    let shareObject = {};

    if (activeLayers.length > 0) {
      shareObject.activeLayers = activeLayers.join(',');
    }

    //- If the active basemap is not equal to the default, include it
    if (activeBasemap !== KEYS.wriBasemap) {
      shareObject.activeBasemap = activeBasemap;
    }

    //- Set X, Y, and Zoom
    let centerPoint = brApp.map.extent.getCenter();
    shareObject.x = Math.round(centerPoint.getLongitude());
    shareObject.y = Math.round(centerPoint.getLatitude());
    shareObject.z = brApp.map.getLevel();

    return params.toQuery(shareObject);
  }

};

export const applyStateFromUrl = ShareHelper.applyStateFromUrl;
export const prepareStateForUrl = ShareHelper.prepareStateForUrl;
