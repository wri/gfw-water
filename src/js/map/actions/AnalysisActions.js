import alt from 'js/alt';

class AnalysisActions {

  findWatershed () {
    app.debug('AnalysisActions >>> findWatershed');
  }

  zoomToWatershed () {
    app.debug('AnalysisActions >>> zoomToWatershed');
  }

}

export const analysisActions = alt.createActions(AnalysisActions);
