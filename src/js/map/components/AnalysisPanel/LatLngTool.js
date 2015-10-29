import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import utils from 'utils/AppUtils';
import React from 'react';

export default class LatLngTool extends React.Component {

  analyzeLatLng () {
    let latInput = this.refs.latInput;
    let lonInput = this.refs.lonInput;
    let lat = parseFloat(latInput.value);
    let lon = parseFloat(lonInput.value);

    if (utils.validLatLng(lat, lon)) {
      let point = analysisActions.addPointFromLatLng(lat, lon);
      analysisActions.findWatershed(point);
    } else {
      alert(text.invalidLatLng);
    }
  }

  render () {
    return (
      <div className='lat-lng-tool text-center'>
        <div className='lat-lng-instructions'>{text.latLngInstructions}</div>
        <div className='flex lat-lng-form'>
          <input ref='latInput' type='text' placeholder={text.latPlaceholder} />
          <input ref='lonInput' type='text' placeholder={text.lonPlaceholder} />
        </div>
        <div className='gfw-btn blue pointer lat-lng-btn' onClick={::this.analyzeLatLng}>{text.latLngGoButton}</div>
      </div>
    );
  }
}
