import CustomAnalysisLink from 'components/AnalysisPanel/CustomAnalysisLink';
import WatershedChart from 'components/AnalysisPanel/WatershedChart';
import LossFootnote from 'components/AnalysisPanel/LossFootnote';
import {analysisPanelText as text} from 'js/config';
import React from 'react';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

let WatershedAnalysis = props => {
  return (
    <div className={`watershed-analysis ${props.active ? '' : 'hidden'}`}>
      {!props.activeWatershed ? <p className='analysis-placeholder'>{text.watershedTabPlaceholder}</p> :
        <div>
          <div className='feature-title'>{text.getWatershedTitle(props.activeWatershed)}</div>
          <div className='watershed-summary flex'>
            <span className='watershed-summary-label relative'>
              {text.watershedSummeryInfo}
              <span className='info-icon pointer'>
                <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
              </span>
            </span>
          </div>
          <WatershedChart feature={props.activeWatershed} />
          <LossFootnote />
          <CustomAnalysisLink />
          <div className='full-report-button gfw-btn blue pointer'>{text.fullReportButton}</div>
        </div>
      }
    </div>
  );
};

export { WatershedAnalysis as default };
