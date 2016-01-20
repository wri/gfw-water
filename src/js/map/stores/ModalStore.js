import {modalActions} from 'actions/ModalActions';
import {modalText} from 'js/config';
import cookie from 'dojo/cookie';
import alt from 'js/alt';

class ModalStore {

  constructor () {
    this.bitlyUrl = '';
    this.modalLayerInfo = {};
    this.basicModalText = '';
    this.basicModalTitle = '';
    this.lossCookieValue = cookie(modalText.historicLoss.cookieName);

    this.bindListeners({
      showLayerInfo: modalActions.showLayerInfo,
      updateBitlyUrl: modalActions.showShareModal,
      showBasicModal: modalActions.showBasicModal,
      saveLossCookie: modalActions.saveLossCookie
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

  saveLossCookie (options) {
    //- Should be false or a string indicating what action to perform
    let value = options.value ? options.action : options.value;
    this.lossCookieValue = value;
    cookie(modalText.historicLoss.cookieName, value, { expires: 14 });
  }

}

export const modalStore = alt.createStore(ModalStore, 'ModalStore');
