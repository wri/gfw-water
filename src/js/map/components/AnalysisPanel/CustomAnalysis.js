import CustomAreaHeader from 'components/AnalysisPanel/CustomAreaHeader';
import LatLngTool from 'components/AnalysisPanel/LatLngTool';
import {analysisActions} from 'actions/AnalysisActions';
import AnalysisHelper from 'helpers/AnalysisHelper';
import {analysisPanelText as config} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import {mapStore} from 'stores/MapStore';
import Loader from 'components/Loader';
import Draw from 'esri/toolbars/draw';
import KEYS from 'js/constants';
import React from 'react';

// Temporary for the prototype
import CustomAnalysisLink from 'components/AnalysisPanel/CustomAnalysisLink';
import WatershedSummary from 'components/AnalysisPanel/WatershedSummary';
import WatershedChart from 'components/AnalysisPanel/WatershedChart';
import LossFootnote from 'components/AnalysisPanel/LossFootnote';


let runReport = () => {
  // Show Loader of some sort saying that we are preparing to perform analysis
  let {activeCustomArea, customAreaName} = analysisStore.getState();
  let {canopyDensity} = mapStore.getState();
  //- Give the feature a name and save the area, the area is in square kilometers, first
  //- convert it to hectares by multiplying by 100
  let area = config.squareKilometersToHectares(activeCustomArea.attributes[config.hydrologyServiceAreaField]);
  activeCustomArea.attributes[config.watershedNameField] = customAreaName;
  activeCustomArea.attributes[config.watershedAreaField] = area;

  console.log(activeCustomArea.attributes);

  analysisActions.saveFeature(activeCustomArea).then(res => {
    if (res.length > 0 && res[0].success) {
      analysisActions.launchReport(`C_${res[0].objectId}`, canopyDensity);
    }
  }, err => {
    console.log(err);
  });
};

let editSvg = '<use xlink:href="#icon-edit-text" />';

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
      toolbar = new Draw(brApp.map);
      toolbar.on('draw-end', evt => {
        // Deactivate toolbar, update store, then add point to map to show location and find watershed around point
        toolbar.deactivate();
        analysisActions.toggleDrawToolbar(false);
        analysisActions.toggleLoader(true);
        // Find out if this point is in a watershed
        // TODO: Refactor this, inital request should originate from an action, this way I dont need
        // explicit actions for showing/hiding loading wheels and they can be managed from the store
        AnalysisHelper.findWatershed(evt.geometry).then(() => {
          AnalysisHelper.performUpstreamAnalysis(evt.geometry).then(feature => {
            analysisActions.toggleLoader(false);
            analysisActions.analyzeCustomArea(feature);
            //- Set the extent but expand a bit to give some context to the location
            brApp.map.setExtent(feature.geometry.getExtent().expand(1.2));
          }, err => {
            analysisActions.clearCustomArea();
            analysisActions.toggleLoader(false);
            console.error(err);
          });
        });
      });
    }

    analysisActions.toggleDrawToolbar(!this.props.toolbarActive);
  }

  nameChanged (evt) {
    analysisActions.setCustomAreaName(evt.target.value);
  }

  selectAreaTitle () {
    this.refs.customAreaTitle.focus();
    this.refs.customAreaTitle.select();
  }

  render () {
    return (
      <div className={`custom-analysis relative ${this.props.active ? '' : 'hidden'}`}>
        {!this.props.activeCustomArea ?
          <div>
            <Loader active={this.props.isLoading} />
            <CustomAreaHeader />
            <div className={`gfw-btn blue pointer add-point-btn ${this.props.toolbarActive ? 'active' : ''}`} onClick={::this.addPoint}>
              {config.addPointButton}
            </div>
            <div className='custom-analysis-spacer text-center'>or</div>
            <LatLngTool {...this.props} />
          </div>
          :
          <div>
            <div className='custom-area-title relative'>
              <input ref='customAreaTitle' name='customAreaTitle' type='text' placeholder={config.customAreaNamePlaceholder}
                value={this.props.customAreaName} onChange={this.nameChanged} />
              <div className='custom-area-title-edit pointer' onClick={::this.selectAreaTitle}>
                <svg viewBox="0 0 528.899 528.899" dangerouslySetInnerHTML={{ __html: editSvg }}/>
              </div>
            </div>
            <WatershedSummary />
            <WatershedChart id={KEYS.customAreaChartId} feature={this.props.activeCustomArea} />
            <LossFootnote />
            <CustomAnalysisLink />
            <div className='full-report-button gfw-btn blue pointer' onClick={runReport}>{config.fullReportButton}</div>
          </div>
        }
      </div>
    );
  }
}
