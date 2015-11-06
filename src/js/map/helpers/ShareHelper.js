import {layerActions} from 'actions/LayerActions';
import {mapActions} from 'actions/MapActions';
import {mapStore} from 'stores/MapStore';
import * as params from 'utils/params';
import KEYS from 'js/constants';

const ShareHelper = {

  applyStateFromUrl (state) {
    let {activeLayers, activeBasemap} = state;

    if (activeLayers) {
      let layerIds = activeLayers.split(',');
      layerIds.forEach(id => {
        layerActions.addActiveLayer(id);
      });
    }

    if (activeBasemap) {
      mapActions.setBasemap(activeBasemap);
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

    return params.toQuery(shareObject);
  }

};

export const applyStateFromUrl = ShareHelper.applyStateFromUrl;
export const prepareStateForUrl = ShareHelper.prepareStateForUrl;
