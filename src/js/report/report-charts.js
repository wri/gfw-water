export default {
  use: (watershed) => {
    // Risk chart.
    let {rs_fire_c, rs_pf_c, rs_sed_c, rs_tl_c} = watershed.attributes;

    let riskChart = new Highcharts.Chart('risk-chart', {
      chart: {
        backgroundColor: 'transparent',
        type: 'column',
        height: 200,
        width: 450
      },
      title: { text: '' },
      xAxis: { tickLength: 0, labels: { enabled: false } },
      yAxis: { min: 0, max: 5, tickPositions: [0, 1, 3, 5], title: { text: '' } },
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
      credits: { enabled: false },
      series: [{
        type: 'column',
        name: 'Recent tree cover loss',
        data: [rs_pf_c],
        color: '#FF6097',
        pointPlacement: 'between'
      },
      {
        type: 'column',
        name: 'Historical tree cover loss',
        data: [rs_tl_c],
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

    // Land cover chart.
    let fields = ['lc_crop_ha', 'lc_grass_ha', 'lc_for_ha', 'lc_bar_ha', 'lc_dev_ha', 'lc_other_ha'];
    let fieldLabels = ['Cropland', 'Grassland', 'Forest', 'Barren', 'Developed', 'Other'];
    let categoryColors = ['#F2756C', '#40AEBB', '#FFC466', '#B6D9A3', '#FE9E68', '#C2C2C2'];
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
      credits: { enabled: false },
      series: [{
        name: 'Land Cover',
        data: dataSeries
      }]
    });
  }
};
