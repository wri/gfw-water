import {analysisPanelText as text} from 'js/config';
import React from 'react';

export default class WatershedAnalysis extends React.Component {
  render () {
    return (
      <div className={`watershed-analysis ${this.props.active ? '' : 'hidden'}`}>
        {!this.props.feature ? <p className='analysis-placeholder'>{text.watershedTabPlaceholder}</p> :
          <div>
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
    );
  }
}
