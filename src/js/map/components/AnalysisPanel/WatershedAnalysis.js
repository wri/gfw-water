import {analysisPanelText as text} from 'js/config';
import React from 'react';

export default class WatershedAnalysis extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.feature !== prevProps.feature) {
      console.log(this.props.feature);
    }
  }

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
