import CustomAreaHeader from 'components/AnalysisPanel/CustomAreaHeader';
import LatLngTool from 'components/AnalysisPanel/LatLngTool';
import {analysisActions} from 'actions/AnalysisActions';
import AnalysisHelper from 'helpers/AnalysisHelper';
import {analysisPanelText as config, analyticsLabels} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import analytics from 'utils/googleAnalytics';
import {mapStore} from 'stores/MapStore';
import Loader from 'components/Loader';
import Draw from 'esri/toolbars/draw';
import KEYS from 'js/constants';
import React from 'react';

// Temporary for the prototype
import WatershedSummary from 'components/AnalysisPanel/WatershedSummary';
import WatershedChart from 'components/AnalysisPanel/WatershedChart';


let runReport = () => {
  // Show Loader of some sort saying that we are preparing to perform analysis
  let {activeCustomArea, customAreaName} = analysisStore.getState();
  let {canopyDensity} = mapStore.getState();

  //- If this feature was too large to perform custom analysis on, redirect to the
  //- surrounding watersheds analysis using the surroundingBasinField field added
  const parentBasin = activeCustomArea.attributes[config.surroundingBasinField];
  if (parentBasin) {
    analysisActions.launchReport(`W_${parentBasin}`, canopyDensity);
    //- Send off analytics
    analytics(
      KEYS.analyticsCategory,
      KEYS.analyticsAnalysisAction,
      analyticsLabels.analyzeWatershed(parentBasin)
    );
    return;
  }

  //- Save the name before saving the feature
  activeCustomArea.attributes[config.watershedNameField] = customAreaName;

  //- Save custom feature and run report
  analysisActions.saveFeature(activeCustomArea).then(res => {
    if (res.length > 0 && res[0].success) {
      analysisActions.launchReport(`C_${res[0].objectId}`, canopyDensity);
    }

    //- Send off analytics
    analytics(
      KEYS.analyticsCategory,
      KEYS.analyticsAnalysisAction,
      analyticsLabels.analyzeCustomArea(res[0].objectId)
    );

  }, console.error);
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
        AnalysisHelper.findWatershed(evt.geometry).then((watershed) => {
          AnalysisHelper.performUpstreamAnalysis(evt.geometry).then(feature => {
            //- Convert the area to hectares
            let area = config.squareKilometersToHectares(feature.attributes[config.hydrologyServiceAreaField]);
            feature.attributes[config.watershedAreaField] = area;
            //- Hide the loader and perform risk analysis
            analysisActions.analyzeCustomArea(feature, watershed);
            brApp.map.setExtent(feature.geometry.getExtent().expand(1.2));
          }, err => {
            analysisActions.clearCustomArea();
            analysisActions.toggleLoader(false);
            console.error(err);
          });
        }, (err) => {
          if (typeof err === 'string') { alert(err); }
          analysisActions.toggleLoader(false);
        });

        //- Send off analytics
        analytics(
          KEYS.analyticsCategory,
          KEYS.analyticsAnalysisAction,
          analyticsLabels.analyzeAddPoint
        );

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
    const {
      activeCustomArea,
      customAreaName,
      toolbarActive,
      isLoading,
      active
    } = this.props;

    // If the active feature has a surroundingNameField, it is analyzing a Known Watershed and we need to prevent them from
    // Editing the name
    const canEditName = activeCustomArea && activeCustomArea.attributes[config.surroundingBasinField] === undefined;

    return (
      <div className={`custom-analysis relative ${active ? '' : 'hidden'}`}>
        {!activeCustomArea ?
          <div>
            <Loader active={isLoading} />
            <CustomAreaHeader />
            <div className={`gfw-btn blue pointer add-point-btn ${toolbarActive ? 'active' : ''}`} onClick={::this.addPoint}>
              {config.addPointButton}
            </div>
            <div className='custom-analysis-spacer text-center'>or</div>
            <LatLngTool {...this.props} />
          </div>
          :
          <div>
            <div className={`custom-area-title relative ${canEditName ? '' : 'disabled'}`}>
              <input
                ref='customAreaTitle'
                name='customAreaTitle'
                type='text'
                placeholder={config.customAreaNamePlaceholder}
                value={customAreaName}
                onChange={this.nameChanged}
                disabled={!canEditName} />

              <div className='custom-area-title-edit pointer' onClick={::this.selectAreaTitle}>
                <svg viewBox="0 0 528.899 528.899" dangerouslySetInnerHTML={{ __html: editSvg }}/>
              </div>
            </div>
            <WatershedSummary />
            <WatershedChart id={KEYS.customAreaChartId} feature={this.props.activeCustomArea} />
            <div className='full-report-button gfw-btn blue pointer' onClick={runReport}>{config.fullReportButton}</div>
          </div>
        }
      </div>
    );
  }
}
