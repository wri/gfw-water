import WatershedAnalysis from 'components/AnalysisPanel/WatershedAnalysis';
import CustomAnalysis from 'components/AnalysisPanel/CustomAnalysis';
import TabControls from 'components/AnalysisPanel/TabControls';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

let analysisSvg = '<use xlink:href="#icon-analysis" />';

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
        <div className='analyze-button no-shrink'>
          <div className='gfw-btn blue pointer' onClick={this.analyzeContent}>
            <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span>{text.analyzeButton}</span>
          </div>
        </div>

        <TabControls activeTab={this.state.activeTab} />
        <div className='tab-container custom-scroll'>
          <WatershedAnalysis active={this.state.activeTab === text.watershedTabId} feature={this.state.activeFeature} />
          <CustomAnalysis active={this.state.activeTab === text.customTabId} feature={this.state.activeFeature} />
        </div>
        <div className={`no-shrink button-wrapper ${this.state.activeFeature ? '' : 'hidden'}`}>
          <div className='gfw-btn white pointer inline-block' onClick={analysisActions.clearAnalysis}>
            {text.clearAnalysisButton}
          </div>
          <div className='gfw-btn white pointer inline-block' onClick={modalActions.showAlertsModal}>
            {text.getAlertsButton}
          </div>
        </div>
      </div>
    );
  }

}
