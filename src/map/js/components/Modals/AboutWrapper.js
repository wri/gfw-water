import {modalActions} from 'actions/ModalActions';
import {modalStore} from 'stores/ModalStore';
import React from 'react';

let closeSvg = '<use xlink:href="#shape-close" />';

export default class AboutWrapper extends React.Component {

  constructor(props) {
    super(props);

    modalStore.listen(this.storeUpdated.bind(this));
    let defaultState = modalStore.getState();
    this.state = {
      layerInfo: defaultState.modalLayerInfo
    };
  }

  storeUpdated () {
    let currentState = modalStore.getState();
    this.setState({ layerInfo: currentState.modalLayerInfo });
  }

  close () {
    modalActions.hideModal(React.findDOMNode(this).parentElement);
  }

  scrollRight () {
    debugger
  }

  render() {
    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <div onClick={::this.scrollRight}>Scroll Right</div>
        <article className='modal shadow'>
          <div title='close' className='close-icon pointer' onClick={::this.close} >
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
            <div className='modal-content custom-scroll'>
              {this.props.children}
            </div>
        </article>
      </div>
    );
  }

}
