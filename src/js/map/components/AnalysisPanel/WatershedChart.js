import {analysisPanelText as text} from 'js/config';
import React from 'react';

let generateChart = feature => {
  console.log(feature);
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
    yAxis: { min: 0, max: 5, labels: { enabled: false } },
    plotOptions: {
      series: { pointStart: 0, pointInterval: 90, events: { legendItemClick: () => false } },
      column: { pointPadding: 0, groupPadding: 0 }
    },
    legend: { align: 'right', layout: 'vertical' },
    tooltip: {
      formatter: function () {
        return `${this.series.name} - ${this.y}<br>${text.chartLookup[this.y]}`;
      }
    },
    credits: { enabled: false },
    series: [{
      type: 'column',
      name: 'Recent tree cover loss',
      data: [2],
      color: '#FF6097',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Sedimentation',
      data: [4],
      color: '#A79261',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Fire',
      data: [3],
      color: '#EA5A00',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Historic tree cover loss',
      data: [4],
      color: '#D2DF2E',
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
      <div className='watershed-chart' id='watershed-chart' />
    );
  }
}
