import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalActions} from 'actions/ModalActions';
import {layerActions} from 'actions/LayerActions';
import {modalText} from 'js/config';
import KEYS from 'js/constants';
import React from 'react';

let modalNode;

export default class CanopyModal extends React.Component {

  constructor (props) {
    super(props);
    modalNode = document.getElementById('historic-loss-modal');
  }

  hideModal = () => {
    modalActions.hideModal(modalNode);
    modalActions.saveLossCookie({
      value: this.refs.historicLossInput.checked,
      action: KEYS.lossCookieHide
    });
  };

  showLayer = () => {
    layerActions.addActiveLayer(KEYS.treeCover);
    modalActions.hideModal(modalNode);
    modalActions.saveLossCookie({
      value: this.refs.historicLossInput.checked,
      action: KEYS.lossCookieShow
    });
  };

  render() {
    return (
      <ModalWrapper>
        <div className='historic-loss__content'>
          <div>{modalText.historicLoss.question}</div>
          <div className='modal-buttons historic-loss__buttons'>
            <div className='gfw-btn blue pointer' onClick={this.showLayer}>Yes</div>
            <div className='gfw-btn blue pointer' onClick={this.hideModal}>No</div>
          </div>
          <div className='historic-loss__input'>
            <label>
              <input ref='historicLossInput' type='checkbox' />
              {modalText.historicLoss.cookieLabel}
            </label>
          </div>
        </div>
      </ModalWrapper>
    );
  }

}
