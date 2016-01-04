import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText} from 'js/config';
import alt from 'js/alt';

class AnalysisStore {

  constructor () {
    this.isLoading = false;
    this.toolbarActive = false;
    this.activeWatershed = null;
    this.activeCustomArea = null;
    this.activeTab = analysisPanelText.watershedTabId;
    this.customAreaName = analysisPanelText.customAreaNamePlaceholder;

    this.bindListeners({
      toggleLoader: analysisActions.toggleLoader,
      clearCustomArea: analysisActions.clearCustomArea,
      setAnalysisType: analysisActions.setAnalysisType,
      toggleDrawToolbar: analysisActions.toggleDrawToolbar,
      analyzeCustomArea: analysisActions.analyzeCustomArea,
      setCustomAreaName: analysisActions.setCustomAreaName,
      clearActiveWatershed: analysisActions.clearActiveWatershed,
      analyzeCurrentWatershed: analysisActions.analyzeCurrentWatershed
    });
  }

  clearActiveWatershed () {
    this.toolbarActive = false;
    this.activeWatershed = null;
  }

  clearCustomArea () {
    this.toolbarActive = false;
    this.activeCustomArea = null;
  }

  analyzeCurrentWatershed (feature) {
    this.activeWatershed = feature;
  }

  analyzeCustomArea (feature) {
    this.activeCustomArea = feature;
  }

  setCustomAreaName (newName) {
    this.customAreaName = newName;
  }

  setAnalysisType (tabId) {
    this.activeTab = tabId;
  }

  toggleDrawToolbar (status) {
    this.toolbarActive = status;
  }

  toggleLoader (status) {
    this.isLoading = status;
    //- Give it a timeout of 15 secs
    if (status) {
      setTimeout(() => {
        if (this.isLoading) {
          this.isLoading = false;
          this.emitChange();
        }
      }, 15000);
    }
  }

}

export const analysisStore = alt.createStore(AnalysisStore, 'AnalysisStore');
