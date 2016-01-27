/* charts are created but the refs are not needed, prefer this over the no-new rule for side-effects */
/* eslint no-unused-vars:0 */
import {chartText} from 'report/config';
import number from 'dojo/number';
const exportButtonImage = 'url(./css/images/download-icon.svg)';

const makeCharts = (watershed) => {
  // Risk bar chart.
  let {rs_fire_c, rs_pf_c, rs_sed_c, rs_tl_c} = watershed.attributes;
  //- TCL and HTCL can have Not applicable values, this number is 10 and if present, we should not render the
  //- bar but keep it in the chart, so set it to a negative value, as long as highcharts has a yAxis min of 0
  //- the bar will not render
  if (rs_tl_c === 10) { rs_tl_c = -1; }
  if (rs_pf_c === 10) { rs_pf_c = -1; }
  if (rs_sed_c === 10) { rs_sed_c = -1; }

  let riskChart = new Highcharts.Chart('risk-chart', {
    chart: {
      backgroundColor: 'transparent',
      type: 'column',
      height: 200,
      width: 450
    },
    title: { text: '' },
    xAxis: { tickLength: 0, labels: { enabled: false } },
    yAxis: { min: 0, max: 5, tickPositions: [0, 1, 2, 3, 4, 5], title: { text: '' } },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'middle',
      itemStyle: {
        width: '160px',
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
    lang: {
      downloadTooltip: 'Download'
    },
    exporting: {
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          _titleKey: 'downloadTooltip',
          menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems,
          symbol: exportButtonImage
        }
      }
    },
    tooltip: {
      formatter: function () {
        return `${this.series.name} - ${this.y}<br>${chartText.riskLookup[this.y]}`;
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

  // Land cover pie chart.
  let fields = ['lc_crop_ha', 'lc_for_ha', 'lc_grass_ha', 'lc_dev_ha', 'lc_bar_ha', 'lc_other_ha'];
  let fieldLabels = ['Crop', 'Forest', 'Shrub/Grassland', 'Urban', 'Bare', 'Other'];
  let categoryColors = ['#E0A828', '#76B276', '#FFFEC1', '#FCB7CB', '#D3CE63', '#B3B3B3'];
  let dataSeries = fields.map((field, index) => {
    return { y: watershed.attributes[field], name: fieldLabels[index], color: categoryColors[index] };
  });
  let landCoverChart = new Highcharts.Chart('land-cover-chart', {
    chart: {
      backgroundColor: 'transparent',
      height: 200,
      type: 'pie',
      plotShadow: false
    },
    title: { text: '' },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'middle',
      itemStyle: {
        width: '130px',
        fontWeight: 300,
        fontFamily: '\'Fira Sans\', Georgia, serif'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    lang: {
      downloadTooltip: 'Download'
    },
    exporting: {
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          _titleKey: 'downloadTooltip',
          menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems,
          symbol: exportButtonImage
        }
      }
    },
    tooltip: {
      formatter: function () {
        return `<strong>${this.series.name} (HA)</strong><br>${this.key} - ${number.format(this.y)}`;
      }
    },
    credits: { enabled: false },
    series: [{
      name: 'Land Cover',
      data: dataSeries
    }]
  });

  // Tree cover bar chart.
  let annualLosses = [];
  let canopy = watershed.attributes._canopy;
  // Get tree cover loss numbers. attributes start with
  // tl_ and have g##_<year>_ha
  //
  // Regex to find names according to the current canopy density.
  let fieldRegex = new RegExp('tl_g' + canopy + '_(\\d{2})_ha');
  for ( let prop in watershed.attributes ) {
    if ( watershed.attributes.hasOwnProperty(prop) && fieldRegex.test(prop) ) {
      annualLosses.push({
        name: prop,
        value: watershed.attributes[prop],
        year: prop.match(fieldRegex)[1]
      });
    }
  }
  let losses = annualLosses.map((l) => l.value);
  let xAxisLabels = annualLosses.map((l) => l.year);
  let chartMax = Math.ceil(Math.max.apply(null, losses) / 10000) * 10000;
  let chartMid = chartMax / 2;
  let chartFirstQuarter = chartMid / 2;
  let chartThirdQuarter = chartFirstQuarter * 3;
  let treeCoverChart = new Highcharts.Chart('tree-cover-loss-chart', {
    chart: {
      backgroundColor: 'transparent',
      type: 'column',
      height: 300
    },
    title: { text: '' },
    xAxis: {
      labels: { format: '20{value}' },
      categories: xAxisLabels
    },
    yAxis: {
      // min: 0,
      // max: chartMax,
      // tickPositions: [0, chartFirstQuarter, chartMid, chartThirdQuarter, chartMax],
      title: {
        text: ''
      }
    },
    legend: {
      align: 'left',
      itemStyle: {
        fontWeight: 300,
        fontFamily: '\'Fira Sans\', Georgia, serif'
      }
    },
    tooltip: {
      formatter: function () {
        return `<strong>TREE COVER LOSS (HA)</strong><br>20${this.key} - ${number.format(this.y)}`;
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
    lang: {
      downloadTooltip: 'Download'
    },
    exporting: {
      buttons: {
        contextButton: { enabled: false },
        exportButton: {
          _titleKey: 'downloadTooltip',
          menuItems: Highcharts.getOptions().exporting.buttons.contextButton.menuItems,
          symbol: exportButtonImage
        }
      }
    },
    credits: { enabled: false },
    series: [{
      type: 'column',
      name: 'Tree cover loss (ha)',
      data: losses,
      color: '#FF6097'
    }]
  });

};

const use = (watershed) => {
  if ( brApp.highchartsLoaded ) {
    makeCharts(watershed);
  } else {
    brApp.highchartsPromise.then(() => {
      makeCharts(watershed);
    }, console.error);
  }
};

export default {
  use: use
};
