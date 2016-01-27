import {analysisActions} from 'actions/AnalysisActions';
import AnalysisHelper from 'helpers/AnalysisHelper';
import GraphicsHelper from 'helpers/GraphicsHelper';
import {analysisPanelText as text, analyticsLabels} from 'js/config';
import analytics from 'utils/googleAnalytics';
import utils from 'utils/AppUtils';
import KEYS from 'js/constants';
import React from 'react';

export default class LatLngTool extends React.Component {

  analyzeLatLng () {
    let latInput = this.refs.latInput;
    let lonInput = this.refs.lonInput;
    let lat = parseFloat(latInput.value);
    let lon = parseFloat(lonInput.value);

    // If the draw toolbar is active, deactivate it at this point
    if (this.props.toolbarActive) {
      analysisActions.toggleDrawToolbar(false);
    }

    if (utils.validLatLng(lat, lon)) {
      let point = GraphicsHelper.generatePointFromLatLng(lat, lon);
      // Find out if this point is in a watershed
      AnalysisHelper.findWatershed(point).then(() => {
        AnalysisHelper.performUpstreamAnalysis(point).then(feature => {
          //- Convert the area to hectares
          let area = text.squareKilometersToHectares(feature.attributes[text.hydrologyServiceAreaField]);
          feature.attributes[text.watershedAreaField] = area;
          //- Hide the loader and perform risk analysis
          analysisActions.toggleLoader(false);
          analysisActions.analyzeCustomArea(feature);
          brApp.map.setExtent(feature.geometry.getExtent().expand(1.2));
        }, err => {
          analysisActions.clearCustomArea();
          analysisActions.toggleLoader(false);
          console.error(err);
        });
      }, (err) => {
        if (typeof err === 'string') { alert(err); }
      });

      //- Send off analytics
      analytics(
        KEYS.analyticsCategory,
        KEYS.analyticsAnalysisAction,
        analyticsLabels.analyzeSearchCoords
      );

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
          <div className='gfw-btn blue pointer lat-lng-btn' onClick={::this.analyzeLatLng}>{text.latLngGoButton}</div>
        </div>
      </div>
    );
  }
}
