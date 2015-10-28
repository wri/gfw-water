import React from 'react';

let generateChart = featureId => {
  console.log(featureId);
  $('#watershed-chart').highcharts({
    chart: { polar: true },
    title: { text: '' },
    pane: { startAngle: 0, endAngle: 360 },
    xAxis: {
      tickInterval: 360,
      min: 0,
      max: 360,
      labels: { enabled: false }
    },
    yAxis: { min: 0, max: 5 },
    plotOptions: {
      series: { pointStart: 0, pointInterval: 90, events: { legendItemClick: () => false } },
      column: { pointPadding: 0, groupPadding: 0 }
    },
    series: [{
      type: 'column',
      name: 'Tree cover loss',
      data: [2],
      colors: ['#FD6C98'],
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Sedimentation',
      data: [4],
      colors: ['#FF0000'],
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Fire',
      data: [3],
      colors: ['#EA5A00'],
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Historic forest loss',
      data: [4],
      colors: ['#D2DF2E'],
      pointPlacement: 'between'
    }]
  });
};

export default class WatershedChart extends React.Component {

  componentDidMount() {
    generateChart(this.props.feature);
  }

  componentDidUpdate(prevProps) {
    if (this.props.feature !== prevProps.feature && this.props.feature !== null) {
      generateChart(this.props.feature);
    }
  }

  render () {
    return (
      <div className='watershed-chart' id='watershed-chart'>
        {this.props.feature}
      </div>
    );
  }
}
