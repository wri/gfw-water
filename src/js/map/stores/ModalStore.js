import {modalActions} from 'actions/ModalActions';
import alt from 'js/alt';

class ModalStore {

  constructor () {
    this.bitlyUrl = '';
    this.modalLayerInfo = {};
    this.basicModalText = '';
    this.basicModalTitle = '';

    this.bindListeners({
      showLayerInfo: modalActions.showLayerInfo,
      updateBitlyUrl: modalActions.showShareModal,
      showBasicModal: modalActions.showBasicModal
    });
  }

  showLayerInfo (layerInfo) {
    this.modalLayerInfo = layerInfo;
  }

  updateBitlyUrl (bitlyUrl) {
    this.bitlyUrl = bitlyUrl;
  }

  showBasicModal (payload) {
    this.basicModalText = payload.text;
    this.basicModalTitle = payload.title;
  }

}

export const modalStore = alt.createStore(ModalStore, 'ModalStore');
