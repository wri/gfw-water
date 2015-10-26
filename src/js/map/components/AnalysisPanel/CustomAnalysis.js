import {analysisPanelText} from 'js/config';
import React from 'react';

export default class CustomAnalysis extends React.Component {
  render () {
    return (
      <div className={`custom-analysis ${this.props.active ? '' : 'hidden'}`}>
        {!this.props.feature ? <p className='analysis-placeholder'>{analysisPanelText.customTabPlaceholder}</p> :
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
