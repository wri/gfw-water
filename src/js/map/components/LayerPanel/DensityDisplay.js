import {modalActions} from 'actions/ModalActions';
import {layerPanelText} from 'js/config';
import React from 'react';

export default class DensityDisplay extends React.Component {
  render () {
    return (
      <div>
        <span className='canopy-label'>{layerPanelText.treeCover.densityFirst}</span>
        <span className='canopy-button pointer' onClick={modalActions.showCanopyModal}>{this.props.canopyDensity}</span>
        <span className='canopy-label'>{layerPanelText.treeCover.densitySecond}</span>
      </div>
    );
  }
}
