import {analysisPanelText as text} from 'js/config';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

const showBasicModal = () => {
  modalActions.showBasicModal(text.customAreaHeader, text.customAreaContent);
};

let CustomAreaHeader = () => {
  return (
    <div className='custom-area-header flex'>
      <span className='custom-area-header__label relative'>
        {text.customAreaHeader}
        <span className='info-icon pointer' onClick={showBasicModal}>
          <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
        </span>
      </span>
    </div>
  );
};

export { CustomAreaHeader as default };
