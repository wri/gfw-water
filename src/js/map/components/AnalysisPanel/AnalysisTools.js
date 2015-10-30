import WatershedAnalysis from 'components/AnalysisPanel/WatershedAnalysis';
import CustomAnalysis from 'components/AnalysisPanel/CustomAnalysis';
import TabControls from 'components/AnalysisPanel/TabControls';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

let analysisSvg = '<use xlink:href="#icon-analysis" />';
let removeSvg = '<use xlink:href="#icon-remove" />';
let alertsSvg = '<use xlink:href="#icon-alerts" />';

export default class AnalysisTools extends React.Component {

  constructor (props) {
    super(props);

    analysisStore.listen(this.storeUpdated.bind(this));
    let defaultState = analysisStore.getState();
    this.state = defaultState;
  }

  storeUpdated () {
    let newState = analysisStore.getState();
    this.setState(newState);
  }

  analyzeContent () {
    analysisActions.analyzeFeature(this.state.activeFeature);
  }

  render () {
    return (
      <div className='analysis-tools map-component shadow'>
        <div className='analyze-header no-shrink'>
          <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
          <span>{text.analyzeButton}</span>
        </div>

        <TabControls activeTab={this.state.activeTab} />
        <div className='tab-container custom-scroll'>
          <WatershedAnalysis active={this.state.activeTab === text.watershedTabId} {...this.state} />
          <CustomAnalysis active={this.state.activeTab === text.customTabId} {...this.state} />
        </div>
        <div className={`no-shrink analysis-footer flex${this.state.activeFeature ? '' : ' hidden'}`}>
          <div className='clear-analysis pointer flex' onClick={analysisActions.clearAnalysis}>
            <svg dangerouslySetInnerHTML={{ __html: removeSvg }}/>
            {text.clearAnalysisButton}
          </div>
          <div className='analysis-alerts pointer flex' onClick={modalActions.showAlertsModal}>
            <svg dangerouslySetInnerHTML={{ __html: alertsSvg }}/>
            {text.getAlertsButton}
          </div>
        </div>
      </div>
    );
  }

}
