import React from 'react';

export default class CaseStudiesLegend extends React.Component {

  render() {
    return (
      <div className='legend-container'>

          <div className='case-studies-legend'>
            <div className='legend-row'>
              <svg overflow="hidden" width="20" height="20">
                <circle fill="rgb(237, 81, 81)" fill-opacity="1" stroke="rgb(153, 153, 153)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="0" cy="0" r="4" fill-rule="evenodd" stroke-dasharray="none" dojoGfxStrokeStyle="solid" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)"></circle>
              </svg>
              <span className='case-studies-label'>Landscape Restoration</span>
            </div>
            <div className='legend-row'>
              <svg overflow="hidden" width="20" height="20">
                <circle fill="rgb(20, 158, 206)" fill-opacity="1" stroke="rgb(153, 153, 153)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="0" cy="0" r="4" fill-rule="evenodd" stroke-dasharray="none" dojoGfxStrokeStyle="solid" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)"></circle>
              </svg>
              <span className='case-studies-label'>Ecosystem Protection</span>
            </div>
            <div className='legend-row'>
              <svg overflow="hidden" width="20" height="20">
                <circle fill="rgb(167, 198, 54)" fill-opacity="1" stroke="rgb(153, 153, 153)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="0" cy="0" r="4" fill-rule="evenodd" stroke-dasharray="none" dojoGfxStrokeStyle="solid" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)"></circle>
              </svg>
              <span className='case-studies-label'>Erosion Control</span>
            </div>
            <div className='legend-row'>
              <svg overflow="hidden" width="20" height="20">
                <circle fill="rgb(158, 85, 156)" fill-opacity="1" stroke="rgb(153, 153, 153)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="0" cy="0" r="4" fill-rule="evenodd" stroke-dasharray="none" dojoGfxStrokeStyle="solid" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,15.00000000)"></circle>
              </svg>
              <span className='case-studies-label'>Fire Mangagement</span>
            </div>
          </div>
      </div>
    );
  }

  imgMapper (legendInfo, index) {
    return <img key={index} title={legendInfo.label} src={`data:image/png;base64,${legendInfo.imageData}`} />;
  }

}

CaseStudiesLegend.propTypes = {
  url: React.PropTypes.string.isRequired,
  layerIds: React.PropTypes.array.isRequired
};
