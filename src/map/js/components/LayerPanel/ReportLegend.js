import React from 'react';

export default class ReportLegend extends React.Component {
  render() {
    return (
      <div className='report-legend'>
        <span className='report-legend-label'>{this.props.title}</span>
        {this.props.title === 'Recent Forest Loss' ?
        <span dangerouslySetInnerHTML={{__html: '<svg width="10" height="10"><rect width="300" height="100" style="fill:rgb(255,96,151);"></svg>'}} />
        : null}
        {this.props.title === 'Historical Forest Loss' ?
          <span className='historical-loss-holder'>
            <div className='report-legend-data'>Tree cover
              <span className='report-legend-svg' dangerouslySetInnerHTML={{__html: '<svg width="10" height="10"><rect width="300" height="100" style="fill:rgb(0,179,0);"></svg>'}} />
            </div>
            <div className='report-legend-data'>Potential forest coverage
              <span className='report-legend-svg' dangerouslySetInnerHTML={{__html: '<svg width="10" height="10"><rect width="300" height="100" style="fill:rgb(255,255,112);"></svg>'}} />
            </div>
          </span>
        : null}
        {this.props.title === 'Active Fires' ?
          <img src='/css/images/fire_icon.png' />
        : null}
      </div>
    );
  }
}

ReportLegend.propTypes = {
  title: React.PropTypes.string.isRequired
};
