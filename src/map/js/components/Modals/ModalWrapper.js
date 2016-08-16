import {modalActions} from 'actions/ModalActions';
import {modalStore} from 'stores/ModalStore';
import ReactDOM from 'react-dom';
import React, {
  Component
} from 'react';


let closeSvg = '<use xlink:href="#shape-close" />';

export default class ModalWrapper extends Component {

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

  close:any = ():void => {
    modalActions.hideModal(ReactDOM.findDOMNode(this).parentElement);
  };

  render() {

    console.log(this.props);

    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={this.close} />
        <div className={`modal-window ${this.props.canopy ? 'canopy' : ''}`}>
          <div title='close' className='modal-close close-icon pointer' onClick={this.close}>
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
          <div className={`modal-wrapper custom-scroll ${(this.props.children && this.props.children[0]) || !this.props.downloadData ? '' : 'has-footer'}`}>
            {this.props.children}
            {(this.props.children && this.props.children[0]) || !this.props.downloadData ? null :
              <div className='modal-footer'>
                <div className="m-btncontainer is-center">
                  <a href={this.props.downloadData} target="_blank" className="btn blue uppercase download-mobile-link">Learn more or download data</a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
