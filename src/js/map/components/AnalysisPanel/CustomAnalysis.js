import LatLngTool from 'components/AnalysisPanel/LatLngTool';
import {analysisActions} from 'actions/AnalysisActions';
import AnalysisHelper from 'helpers/AnalysisHelper';
import {analysisPanelText as text} from 'js/config';
import Draw from 'esri/toolbars/draw';
import React from 'react';

let toolbar;

export default class CustomAnalysis extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeWatershed !== prevProps.activeWatershed) {
      // console.log(this.props.feature);
    }

    // Turn on or off the toolbar from store changing, this way other components can easily turn this on or off
    if (this.props.toolbarActive) {
      toolbar.activate(Draw.POINT);
    } else if (toolbar) {
      toolbar.deactivate();
    }
  }

  addPoint () {
    // Create the toolbar if necessary
    if (!toolbar) {
      toolbar = new Draw(app.map);
      toolbar.on('draw-end', evt => {
        // Deactivate toolbar, update store, then add point to map to show location and find watershed around point
        toolbar.deactivate();
        analysisActions.toggleDrawToolbar(false);
        // Find out if this point is in a watershed
        AnalysisHelper.findWatershed(evt.geometry).then(() => {
          analysisActions.analyzeCustomArea(evt.geometry);
          AnalysisHelper.performUpstreamAnalysis(evt.geometry);
        });
      });
    }

    analysisActions.toggleDrawToolbar(!this.props.toolbarActive);
  }

  render () {
    return (
      <div className={`custom-analysis ${this.props.active ? '' : 'hidden'}`}>
        {this.props.activeCustomArea ? <p className='analysis-placeholder'>{text.customTabPlaceholder}</p> :
          <div>
            <div className={`gfw-btn blue pointer add-point-btn ${this.props.toolbarActive ? 'active' : ''}`} onClick={::this.addPoint}>
              {text.addPointButton}
            </div>
            <div className='custom-analysis-spacer text-center'>or</div>
            <LatLngTool {...this.props} />
          </div>
        }
      </div>
    );
  }
}
