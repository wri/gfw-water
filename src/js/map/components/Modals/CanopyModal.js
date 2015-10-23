import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalActions} from 'actions/ModalActions';
import {modalText} from 'js/config';
import React from 'react';

export default class CanopyModal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#tree-cover-slider').ionRangeSlider({
      type: 'double',
      values: modalText.canopy.slider,
      hide_min_max: true,
      grid_snap: true,
      to_fixed: true,
      from_min: 1,
      from_max: 7,
      grid: true,
      from: 5,
      onFinish: this.sliderUpdate,
      prettify: value => (value + '%')
    });
  }

  sliderUpdate (data) {
    modalActions.updateCanopyDensity(data.from_value);
  }

  render() {
    return (
      <ModalWrapper>
        <div className='canopy-modal-content'>
          <div className='canopy-modal-title'>{modalText.canopy.title}</div>
          <div className='trees'>
            <div className='tree-icon' />
            <div className='forest-icon' />
          </div>
          <div className='slider-container'>
            <div id='tree-cover-slider' />
          </div>
        </div>
      </ModalWrapper>
    );
  }

}
