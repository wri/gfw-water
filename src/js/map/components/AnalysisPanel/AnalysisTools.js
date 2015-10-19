import {analysisPanelText} from 'js/config';
import React from 'react';

let analysisSvg = '<use xlink:href="#icon-analysis" />';

export default class AnalysisTools extends React.Component {

  render () {
    return (
      <div className='analysis-tools map-component shadow'>
        <div className='button-wrapper no-shrink'>
          <div className='analyze-button gfw-btn blue pointer'>
            <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span>{analysisPanelText.analyzeButton}</span>
          </div>
        </div>

        <div className='no-shrink'>
          <div className='gfw-btn pointer fifty inline-block'>Current Watershed</div>
          <div className='gfw-btn poitner fifty inline-block'>Custom Analysis</div>
        </div>

        <div className='content-container custom-scroll'>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
        </div>

        <div className='no-shrink'>
          <div className='gfw-btn pointer fifty inline-block'>Clear Analysis</div>
          <div className='gfw-btn poitner fifty inline-block'>Get Alerts</div>
        </div>
      </div>
    );
  }

}
