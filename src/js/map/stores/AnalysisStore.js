import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText} from 'js/config';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.activeFeature = null;
    this.activeTab = analysisPanelText.watershedTabId;
    this.toolbarActive = false;

    this.bindListeners({
      clearAnalysis: analysisActions.clearAnalysis,
      analyzeFeature: analysisActions.analyzeFeature,
      setAnalysisType: analysisActions.setAnalysisType,
      toggleDrawToolbar: analysisActions.toggleDrawToolbar
    });
  }

  clearAnalysis () {
    this.activeFeature = null;
    this.toolbarActive = false;
  }

  analyzeFeature (feature) {
    this.activeFeature = feature;
  }

  setAnalysisType (tabId) {
    this.activeTab = tabId;
  }

  toggleDrawToolbar (status) {
    this.toolbarActive = status;
  }

}

export const analysisStore = alt.createStore(AnalysisStore, 'AnalysisStore');
