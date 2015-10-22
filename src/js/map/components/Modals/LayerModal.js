import {modalActions} from 'actions/ModalActions';
import {modalStore} from 'stores/ModalStore';
import {modalText} from 'js/config';
import React from 'react';

let closeSvg = '<use xlink:href="#shape-close" />';

export default class Modal extends React.Component {

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
    modalActions.hideModal(React.findDOMNode(this).parentElement)
  }

  render () {
    let layerInfo = this.state.layerInfo;
    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <article className='modal shadow'>
          <div className='close-icon pointer' onClick={::this.close} >
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
          {!layerInfo.title ? <div className='no-info-available'>{modalText.noInfo}</div> :
            <div className='modal-content custom-scroll'>
              <div className='source-header'>
                <strong className='source-title'>{layerInfo.title}</strong>
                <em className='source-description'>{layerInfo.subtitle}</em>
              </div>
              <div className='source-body'>
                <div className='source-table'>
                  {layerInfo.table.map(this.tableMap)}
                </div>
                <div className='source-summary'>
                  {layerInfo.overview.map(this.summaryMap)}
                </div>
                <div className='source-credits'>
                  {layerInfo.citation.map(this.paragraphMap)}
                </div>
              </div>
            </div>
          }
        </article>
      </div>
    );
  }

  tableMap (item) {
    return (
      <dl className='source-row'>
        <dt>{item.label}</dt>
        <dd dangerouslySetInnerHTML={{ __html: item.html }}></dd>
      </dl>
    );
  }

  summaryMap (item) {
    if (typeof item === 'string') {
      return <p dangerouslySetInnerHTML={{ __html: item }} />;
    } else {
      return (
        <ul>
          {item.map(listItem => <li dangerouslySetInnerHTML={{ __html: listItem }} />)}
        </ul>
      );
    }
  }

  paragraphMap (item) {
    return <p dangerouslySetInnerHTML={{ __html: item }} />;
  }

}
