import {analysisPanelText as text} from 'js/config';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

const showBasicModal = () => {
  modalActions.showBasicModal(text.watershedSummeryInfo, text.watershedSummeryInfoDescription);
};

let WatershedSummary = () => {
  return (
    <div className='watershed-summary flex'>
      <span className='watershed-summary-label relative'>
        {text.watershedSummeryInfo}
        <span className='info-icon pointer' onClick={showBasicModal}>
          <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
        </span>
      </span>
    </div>
  );
};

export { WatershedSummary as default };
