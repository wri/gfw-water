import {modalActions} from 'actions/ModalActions';
import alt from 'js/alt';

class ModalStore {

  constructor () {
    this.modalLayerInfo = {};

    this.bindListeners({
      showLayerInfo: modalActions.showLayerInfo
    });
  }

  showLayerInfo (layerInfo) {
    this.modalLayerInfo = layerInfo;
  }

}

export const modalStore = alt.createStore(ModalStore, 'ModalStore');
