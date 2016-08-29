import {mapActions} from 'actions/MapActions';
import React from 'react';

let layersSvg = '<use xlink:href="#icon-basemap" />';
let analysisSvg = '<use xlink:href="#icon-analysis" />';

export default class MobileControls extends React.Component {

  render () {
    return (
      <nav className='mobile-show map-component mobile-controls'>
        <ul className='mobile-controls__list'>
          <li className='mobile-controls__item pointer' onClick={mapActions.toggleMobileLayerList}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: layersSvg }}/>
            <span className='mobile-controls__item-label'>Layers</span>
          </li>
          <li className='mobile-controls__item pointer' onClick={mapActions.toggleMobileAnalysis}>
            <svg className='panel-icon' dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span className='mobile-controls__item-label'>Analyze</span>
          </li>
        </ul>
      </nav>
    );
  }
}
