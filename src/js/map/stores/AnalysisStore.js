import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText} from 'js/config';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.activeFeature = null;
    this.activeTab = analysisPanelText.watershedTabId;

    this.bindListeners({
      clearAnalysis: analysisActions.clearAnalysis,
      analyzeFeature: analysisActions.analyzeFeature,
      setAnalysisType: analysisActions.setAnalysisType
    });
  }

  clearAnalysis () {
    this.activeFeature = null;
  }

  analyzeFeature (feature) {
    this.activeFeature = feature;
  }

  setAnalysisType (tabId) {
    this.activeTab = tabId;
  }

}

export const analysisStore = alt.createStore(AnalysisStore, 'AnalysisStore');
