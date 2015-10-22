import {layerInformation} from 'js/config';
import domClass from 'dojo/dom-class';
import alt from 'js/alt';

class ModalActions {

  showLayerInfo (layerId) {
    app.debug('ModalActions >>> showLayerInfo');
    let emptyObj = {};
    let layerInfo = layerInformation[layerId] || emptyObj;
    this.dispatch(layerInfo);
    if (layerInfo !== emptyObj) {
      domClass.remove('layer-modal', 'hidden');
    }
  }

  showAlertsModal () {
    domClass.remove('alerts-modal', 'hidden');
  }

  hideModal (node) {
    domClass.add(node, 'hidden');
  }

}

export const modalActions = alt.createActions(ModalActions);
