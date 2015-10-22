import {modalText} from 'js/config';
import ModalWrapper from 'components/Modals/ModalWrapper';
import React from 'react';

export default class AlertModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ModalWrapper>
        <div>{modalText.alerts.title}</div>
        <div>{modalText.alerts.descriptions.email}</div>
        <div>
          <input type='text' placeholder='Name'></input>
        </div>
        <div>{modalText.alerts.descriptions.phone}</div>
        <div>
          <input type='text' placeholder='Phone'></input>
        </div>
      </ModalWrapper>
    );
  }

}

