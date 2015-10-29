import LatLngTool from 'components/AnalysisPanel/LatLngTool';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import Draw from 'esri/toolbars/draw';
import React from 'react';

let toolbar;

export default class CustomAnalysis extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.feature !== prevProps.feature) {
      // console.log(this.props.feature);
    }
  }

  addPoint () {
    // Create the toolbar if necessary
    if (!toolbar) {
      toolbar = new Draw(app.map);
      toolbar.on('draw-end', evt => {
        toolbar.deactivate();
        analysisActions.addPointFromDraw(evt.geometry);
        analysisActions.findWatershed(evt.geometry);
      });
    }
    toolbar.activate(Draw.POINT);
  }

  render () {
    return (
      <div className={`custom-analysis ${this.props.active ? '' : 'hidden'}`}>
        {this.props.feature ? <p className='analysis-placeholder'>{text.customTabPlaceholder}</p> :
          <div>
            <div className='gfw-btn blue pointer add-point-btn' onClick={this.addPoint}>{text.addPointButton}</div>
            <div className='custom-analysis-spacer text-center'>or</div>
            <LatLngTool />
          </div>
        }
      </div>
    );
  }
}
