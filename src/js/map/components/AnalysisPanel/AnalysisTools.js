import {analysisActions} from 'actions/AnalysisActions';
import {analysisStore} from 'stores/AnalysisStore';
import {modalActions} from 'actions/ModalActions';
import {analysisPanelText} from 'js/config';
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
    analysisActions.analyzeFeature('test');
  }

  render () {
    let hasFeature = this.state.selectedFeatureId !== undefined;

    return (
      <div className='analysis-tools map-component shadow'>
        <div className='analyze-button no-shrink'>
          <div className='gfw-btn blue pointer' onClick={this.analyzeContent}>
            <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span>{analysisPanelText.analyzeButton}</span>
          </div>
        </div>

        <div className='no-shrink tabs'>
          <div className='gfw-btn pointer inline-block active'>{analysisPanelText.currentWatershedTab}</div>
          <div className='gfw-btn pointer inline-block'>{analysisPanelText.customAnalysisTab}</div>
        </div>

        <div className='content-container custom-scroll'>
          {!hasFeature ? <p className='analysis-placeholder'>{analysisPanelText.analysisPlaceholder}</p> :
            <div className='current-watershed-panel'>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
              <div>Test</div>
            </div>
          }
        </div>

        <div className={`no-shrink button-wrapper ${hasFeature ? '' : 'hidden'}`}>
          <div className='gfw-btn white pointer inline-block' onClick={analysisActions.clearAnalysis}>
            {analysisPanelText.clearAnalysisButton}
          </div>
          <div className='gfw-btn white pointer inline-block' onClick={modalActions.showAlertsModal}>
            {analysisPanelText.getAlertsButton}
          </div>
        </div>
      </div>
    );
  }

}
