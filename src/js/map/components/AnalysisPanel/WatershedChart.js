import React from 'react';

export default class WatershedChart extends React.Component {

  constructor (props) {
    super(props);
    console.log(props.feature);
  }

  componentDidUpdate(prevProps) {
    if (this.props.feature !== prevProps.feature && this.props.feature !== null) {
      console.log(this.props.feature);
    }
  }

  render () {
    return (
      <div className='watershed-chart'>
        {this.props.feature}
      </div>
    );
  }
}
