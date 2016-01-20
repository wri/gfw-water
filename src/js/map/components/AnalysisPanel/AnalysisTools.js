import WatershedAnalysis from 'components/AnalysisPanel/WatershedAnalysis';
import CustomAnalysis from 'components/AnalysisPanel/CustomAnalysis';
import TabControls from 'components/AnalysisPanel/TabControls';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import {modalActions} from 'actions/ModalActions';
import {mapStore} from 'stores/MapStore';
import React from 'react';

let analysisSvg = '<use xlink:href="#icon-analysis" />';
let removeSvg = '<use xlink:href="#icon-remove" />';
let alertsSvg = '<use xlink:href="#icon-alerts" />';

export default class AnalysisTools extends React.Component {

  constructor (props) {
    super(props);
    analysisStore.listen(this.storeUpdated.bind(this));
    mapStore.listen(this.storeUpdated.bind(this));
    let defaultState = analysisStore.getState();
    let mapState = mapStore.getState();
    defaultState.controlsVisible = mapState.controlsVisible;
    this.state = defaultState;
  }

  storeUpdated () {
    let newState = analysisStore.getState();
    let mapState = mapStore.getState();
    newState.controlsVisible = mapState.controlsVisible;
    this.setState(newState);
  }

  clearAnalysis () {
    if (this.state.activeTab === text.customTabId) {
      analysisActions.clearCustomArea();
    } else {
      analysisActions.clearActiveWatershed();
    }
  }

  render () {
    let customTabActive = this.state.activeTab === text.customTabId;
    let watershedTabActive = this.state.activeTab === text.watershedTabId;
    let showOptions = (this.state.activeWatershed && watershedTabActive) || (this.state.activeCustomArea && customTabActive);

    return (
      <div className={`analysis-tools map-component shadow${!this.state.controlsVisible ? ' hidden' : ''}`}>
        <div className='analyze-header no-shrink'>
          <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
          <span>{text.analyzeButton}</span>
        </div>
        <TabControls activeTab={this.state.activeTab} />
        <div className='tab-container custom-scroll'>
          <WatershedAnalysis active={watershedTabActive} {...this.state} />
          <CustomAnalysis active={customTabActive} {...this.state} />
        </div>
        <div className={`no-shrink analysis-footer flex${showOptions ? '' : ' hidden'}`}>
          <div className='clear-analysis pointer flex' onClick={::this.clearAnalysis}>
            <svg dangerouslySetInnerHTML={{ __html: removeSvg }}/>
            <span className='analysis-action-label'>{text.clearAnalysisButton}</span>
          </div>
          <div className='analysis-alerts pointer flex' onClick={modalActions.showAlertsModal}>
            <svg dangerouslySetInnerHTML={{ __html: alertsSvg }}/>
            <span className='analysis-action-label'>{text.getAlertsButton}</span>
          </div>
        </div>
      </div>
    );
  }

}
