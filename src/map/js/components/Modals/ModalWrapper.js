import {modalActions} from 'actions/ModalActions';
import {modalStore} from 'stores/ModalStore';
import React from 'react';

let closeSvg = '<use xlink:href="#shape-close" />';

export default class ModalWrapper extends React.Component {

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

  render() {
    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <article className='modal shadow'>
          <div title='close' className='close-icon pointer' onClick={::this.close} >
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
            <div className='modal-content custom-scroll'>
              {this.props.children}
              {(this.props.children && this.props.children[0]) || !this.props.downloadData ? null :
              <div className='modal-footer'>
                <div className="m-btncontainer is-center">
                  <a href={this.props.downloadData} target="_blank" className="btn green uppercase download-mobile-link">Learn more or download data</a>
                </div>
              </div>
            }
            </div>
        </article>
      </div>
    );
  }

}
