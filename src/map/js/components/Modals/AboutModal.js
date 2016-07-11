import AboutWrapper from 'components/Modals/AboutWrapper';
import {modalStore} from 'stores/ModalStore';
import {aboutModalConfig} from 'js/config';
import React from 'react';

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
    let displayNumbers;
    // if (currentSelection) {
    displayNumbers = aboutModalConfig[currentSelection];
    //   debugger
    // }
    return (
      <AboutWrapper>
        <div className='about-modal-content'>
          {displayNumbers ? <div className='modal-title'>{displayNumbers.title}</div> : null}
          <ul>
            {displayNumbers ? displayNumbers.bullets.map(this.bulletMap) : null}
          </ul>
        </div>
      </AboutWrapper>
    );
  }

  bulletMap (item) {
    // <ul>
    //   <p dangerouslySetInnerHTML={{ __html: item }} />;
    // </ul>

    if (item.length) {
      return (
        <ul>
          {item.map(listItem => <li dangerouslySetInnerHTML={{ __html: listItem.label }} />)}
        </ul>
      );
      // return (
      //   item.map()
      // );
    } else {
      console.log(item)
      return (
        <li dangerouslySetInnerHTML={{ __html: item.label }} />
      );
    }
  }

}
