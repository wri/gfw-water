import {analysisActions} from 'actions/AnalysisActions';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.selectedFeatureId = undefined;

    this.bindListeners({
      clearAnalysis: analysisActions.clearAnalysis,
      analyzeFeature: analysisActions.analyzeFeature
    });
  }

  clearAnalysis () {
    this.selectedFeatureId = undefined;
  }

  analyzeFeature (featureId) {
    this.selectedFeatureId = featureId;
  }

}

export const analysisStore = alt.createStore(AnalysisStore, 'AnalysisStore');
