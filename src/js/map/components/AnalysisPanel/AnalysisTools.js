import WatershedAnalysis from 'components/AnalysisPanel/WatershedAnalysis';
import CustomAnalysis from 'components/AnalysisPanel/CustomAnalysis';
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

  changeTab (tab) {
    analysisActions.setAnalysisType(tab);
  }

  render () {
    let watershedTabActive = this.state.activeTab === text.watershedTabId;
    let customTabActive = this.state.activeTab === text.customTabId;

    return (
      <div className='analysis-tools map-component shadow'>
        <div className='analyze-button no-shrink'>
          <div className='gfw-btn blue pointer' onClick={this.analyzeContent}>
            <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span>{text.analyzeButton}</span>
          </div>
        </div>

        <div className='no-shrink tabs'>
          <div className={`gfw-btn pointer inline-block ${watershedTabActive ? 'active' : ''}`} onClick={this.changeTab.bind(this, text.watershedTabId)}>
            {text.watershedTabLabel}
          </div>
          <div className={`gfw-btn pointer inline-block ${customTabActive ? 'active' : ''}`} onClick={this.changeTab.bind(this, text.customTabId)}>
            {text.customTabLabel}
          </div>
        </div>

        <div className='content-container custom-scroll'>
          <WatershedAnalysis active={watershedTabActive} feature={this.state.activeFeature} />
          <CustomAnalysis active={customTabActive} feature={this.state.activeFeature} />
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
