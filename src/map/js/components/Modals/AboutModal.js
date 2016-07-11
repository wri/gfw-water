import AboutWrapper from 'components/Modals/AboutWrapper';
import {modalStore} from 'stores/ModalStore';
import {aboutModalConfig} from 'js/config';
import React from 'react';


let toolsSvg = '<use xlink:href="#about-icon-tools" />';
let economicsSvg = '<use xlink:href="#about-icon-economics" />';
let guidanceSvg = '<use xlink:href="#about-icon-guidance" />';
let infrastructureSvg = '<use xlink:href="#about-icon-natural-infrastructure" />';
let otherSvg = '<use xlink:href="#about-icon-other" />';

export default class AboutModal extends React.Component {

  constructor (props) {
    super(props);
    let defaultState = modalStore.getState();
    this.state = {
      aboutModalSelection: defaultState.aboutModalSelection
    };
    modalStore.listen(::this.storeUpdated);
  }

  storeUpdated () {
    let newState = modalStore.getState();
    this.setState({
      aboutModalSelection: newState.aboutModalSelection
    });
  }

  render () {
    let currentSelection = this.state.aboutModalSelection;
    let displayNumbers, svgSelected;

    displayNumbers = aboutModalConfig[currentSelection];
    switch (currentSelection) {
      case 'spatialMapping':
        svgSelected = toolsSvg;
        break;
      case 'economics':
        svgSelected = economicsSvg;
        break;
      case 'guidance':
        svgSelected = guidanceSvg;
        break;
      case 'naturalInfrastructure':
        svgSelected = infrastructureSvg;
        break;
      case 'otherWRI':
        svgSelected = otherSvg;
        break;
      default:
        svgSelected = null;
    }

    return (
      <AboutWrapper>
        <div className='about-modal-content'>
          {svgSelected ? <div className='modal-icon'>
            <div className='top-icon'>
            <svg dangerouslySetInnerHTML={{ __html: svgSelected }}/>
          </div></div> : null }
          {displayNumbers ? <div className='modal-title'>{displayNumbers.title}</div> : null}
          <ul className='about-modal-list'>
            {displayNumbers ? displayNumbers.bullets.map(this.bulletMap) : null}
          </ul>
        </div>
      </AboutWrapper>
    );
  }

  bulletMap (item) {
    if (item.length) {
      return (
        <ul>
          {item.map(listItem => <li dangerouslySetInnerHTML={{ __html: listItem.label }} />)}
        </ul>
      );
    } else {
      return (
        <li dangerouslySetInnerHTML={{ __html: item.label }} />
      );
    }
  }

}
