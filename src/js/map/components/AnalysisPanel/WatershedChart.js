import {analysisPanelText as text} from 'js/config';
import React from 'react';

let generateChart = (id, feature) => {
  /**
  * rs_tl_c - Recent Tree cover loss
  * rs_pf_c - Historic Tree cover loss
  * rs_sed_c - Erosion
  * rs_fire_c - Fire
  */
  let { rs_tl_c, rs_pf_c, rs_sed_c, rs_fire_c } = feature.attributes;
  $(`#${id}`).highcharts({
    chart: {
      backgroundColor: 'transparent',
      type: 'column'
    },
    title: { text: '' },
    xAxis: { tickLength: 0, labels: { enabled: false } },
    yAxis: { min: 0, max: 5, tickPositions: [0, 1, 2, 3, 4, 5], title: { text: '' } },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'middle',
      itemStyle: {
        width: '150px',
        fontWeight: 300,
        fontFamily: '\'Fira Sans\', Georgia, serif'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0
      },
      series: {
        groupPadding: 0
      }
    },
    tooltip: {
      formatter: function () {
        return `${this.series.name} - ${this.y}<br>${text.riskLookup[this.y]}`;
      }
    },
    credits: { enabled: false },
    series: [{
      type: 'column',
      name: 'Recent tree cover loss',
      data: [rs_tl_c],
      color: '#FF6097',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Historical tree cover loss',
      data: [rs_pf_c],
      color: '#D2DF2E',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Erosion',
      data: [rs_sed_c],
      color: '#A79261',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Fire',
      data: [rs_fire_c],
      color: '#EA5A00',
      pointPlacement: 'between'
    }]
  });
};

export default class WatershedChart extends React.Component {

  componentDidMount() {
    generateChart(this.props.id, this.props.feature);
  }

  componentDidUpdate(prevProps) {
    if (this.props.feature !== prevProps.feature && this.props.feature !== null) {
      generateChart(this.props.id, this.props.feature);
    }
  }

  render () {
    return (
      <div className='watershed-chart' id={this.props.id} />
    );
  }
}
