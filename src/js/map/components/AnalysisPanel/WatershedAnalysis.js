import CustomAnalysisLink from 'components/AnalysisPanel/CustomAnalysisLink';
import WatershedChart from 'components/AnalysisPanel/WatershedChart';
import LossFootnote from 'components/AnalysisPanel/LossFootnote';
import {analysisPanelText as text} from 'js/config';
import React from 'react';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

export default class WatershedAnalysis extends React.Component {
  render () {
    return (
      <div className={`watershed-analysis ${this.props.active ? '' : 'hidden'}`}>
        {!this.props.activeWatershed ? <p className='analysis-placeholder'>{text.watershedTabPlaceholder}</p> :
          <div>
            <div className='feature-title'>{text.getWatershedTitle(this.props.activeWatershed)}</div>
            <div className='watershed-summary flex'>
              <span className='watershed-summary-label relative'>
                {text.watershedSummeryInfo}
                <span className='info-icon pointer'>
                  <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
                </span>
              </span>
            </div>
            <WatershedChart feature={this.props.activeWatershed} />
            <LossFootnote />
            <CustomAnalysisLink />
            <div className='full-report-button gfw-btn blue pointer'>{text.fullReportButton}</div>
          </div>
        }
      </div>
    );
  }
}
