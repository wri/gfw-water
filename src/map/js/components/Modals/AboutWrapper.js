import {modalActions} from 'actions/ModalActions';
import {modalStore} from 'stores/ModalStore';
import React from 'react';

let closeSvg = '<use xlink:href="#shape-close" />';
let leftArrow = '<use xlink:href="#shape-arrow-left" />';
let rightArrow = '<use xlink:href="#shape-arrow-right" />';


export default class AboutWrapper extends React.Component {

  constructor(props) {
    super(props);

    modalStore.listen(this.storeUpdated.bind(this));
    let defaultState = modalStore.getState();
    this.state = {
      aboutModalSelection: defaultState.aboutModalSelection
    };
  }

  storeUpdated () {
    let currentState = modalStore.getState();
    this.setState({ aboutModalSelection: currentState.aboutModalSelection });
  }

  close () {
    modalActions.hideModal(React.findDOMNode(this).parentElement);
  }

  scrollRight () {
    let nextCard;
    switch (this.state.aboutModalSelection) {
      case 'spatialMapping':
        nextCard = 'economics';
        break;
      case 'economics':
        nextCard = 'guidance';
        break;
      case 'guidance':
        nextCard = 'naturalInfrastructure';
        break;
      case 'naturalInfrastructure':
        nextCard = 'otherWRI';
        break;
      case 'otherWRI':
        nextCard = 'spatialMapping';
        break;
      default:
        break;
    }
    modalActions.showAboutModal(nextCard);
  }

  scrollLeft () {
    let previousCard;
    switch (this.state.aboutModalSelection) {
      case 'spatialMapping':
        previousCard = 'otherWRI';
        break;
      case 'economics':
        previousCard = 'spatialMapping';
        break;
      case 'guidance':
        previousCard = 'economics';
        break;
      case 'naturalInfrastructure':
        previousCard = 'guidance';
        break;
      case 'otherWRI':
        previousCard = 'naturalInfrastructure';
        break;
      default:
        break;
    }
    modalActions.showAboutModal(previousCard);
  }

  render() {
    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <div className='modal-arrows'>
          <div onClick={::this.scrollLeft} className='icon-arrow is-left'>
            <svg dangerouslySetInnerHTML={{ __html: leftArrow }}/>
          </div>
          <div onClick={::this.scrollRight} className='icon-arrow is-right'>
            <svg dangerouslySetInnerHTML={{ __html: rightArrow }}/>
          </div>
        </div>
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
