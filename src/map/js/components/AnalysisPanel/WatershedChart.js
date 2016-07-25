import {analysisPanelText as text} from 'js/config';
import React from 'react';

let generateChart = (id, feature) => {
  /**
  * rs_tl_c - Recent forest loss
  * rs_pf_c - Historic forest loss
  * rs_sed_c - Erosion risk
  * rs_fire_c - Fire risk
  */
  let { rs_tl_c, rs_pf_c, rs_sed_c, rs_fire_c } = feature.attributes;

  //- TCL and HTCL can have Not applicable values, this number is 10 and if present, we should not render the
  //- bar but keep it in the chart, so set it to a negative value, as long as highcharts has a yAxis min of 0
  //- the bar will not render
  if (rs_tl_c === 10) { rs_tl_c = -1; }
  if (rs_pf_c === 10) { rs_pf_c = -1; }
  if (rs_sed_c === 10) { rs_sed_c = -1; }

  // Don't use arrow functions in here, highcharts already is binding the scope
  $(`#${id}`).highcharts({
    chart: {
      backgroundColor: 'transparent',
      type: 'column'
    },
    title: { text: '' },
    xAxis: { tickLength: 0, labels: { enabled: false } },
    yAxis: {
      min: 0,
      max: 5,
      tickPositions: [0, 1, 2, 3, 4, 5],
      title: { text: '' },
      labels: {
        formatter: function () {
          switch (this.value) {
            case 0:
              return 'low';
            case 5:
              return 'high';
            default:
              return '';
          }
        }
      }
    },
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
      name: 'Recent forest loss',
      data: [rs_tl_c],
      color: '#FF6097',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Historical forest loss',
      data: [rs_pf_c],
      color: '#D2DF2E',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Erosion risk',
      data: [rs_sed_c],
      color: '#A79261',
      pointPlacement: 'between'
    },
    {
      type: 'column',
      name: 'Fire risk',
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
