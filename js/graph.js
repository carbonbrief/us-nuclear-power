$(function() {
    Highcharts.setOptions({

      colors: ['#295C83', '#c6e7fa', '#43cfef', '#00A98E', '#32BAA4', '#66CBBB', '#99DCD1', '#CCEDE8', '#a45edb', '#c72bbf', '#dd8a3e', '#efc530', '#5a5a5a'],

      chart: {
        style: {
          fontFamily: '"PT Sans", Arial, sans-serif'
        }
      },
      lang: {
        thousandsSep: ','
      }
    });

    $('#graph-container').highcharts({
      chart: {
        renderTo: 'graph-conatiner',
        backgroundColor: 'transparent',
        type: 'column',
        zoomType: 'x,y'
      },

      title: {
          // no title
          text: '',
      },

      navigation: {
        buttonOptions: {
          // removes the hamburger menu
            enabled: false
        }
      },

      // turn off the highcharts credit
      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          pointPadding: 0,
          groupPadding: 0.1
        }
      },

      yAxis: {
        reversedStacks: false,
        labels: {
          style: {
            fontSize: '12px'
          },
        
          format: '{value:,.0f}'
        },
        title: {
          text: 'Terawatt-hours (TWh)'
        }
      },

      // sets options for the x axis
      xAxis: {
        type: 'category',
        categories: ['Coal', 'Gas', 'Oil', 'Renewables', 'Nuclear'],
        crosshair: {
          color: '#E5E5E5'
        },
          labels: {
            style: {
              fontSize: '12px'
            }
          }
      },

      tooltip: {
        valueDecimals: 1,
        pointFormat: '<b>{point.y:,.0f} TWh</b> in {series.name}',
      },

      // sets options for the legend
      legend: {
        enabled: false,
        // padding: 10,
        // layout: 'horizontal',
        // floating: false,
        // verticalAlign: 'top'
      },

    series: [{
            name: 'Coal',
            data: [1207.9],
            showInLegend: false,
        }, {
            name: 'Natural Gas',
            data: [0, 1287.0],
            showInLegend: false,
        }, {
            name: 'Oil',
            data: [0, 0, 21.1],
            showInLegend: false,
        }, {
            name: 'Hydro',
            data: [0, 0, 0, 300.0],
        }, {
            name: 'Wind',
            data: [0, 0, 0, 254.3],
        }, {
            name: 'Solar',
            data: [0, 0, 0, 77.1],
        }, {
            name: 'Biomass/Biogas',
            data: [0, 0, 0, 64.1],
        }, {
            name: 'Geothermal',
            data: [0, 0, 0, 16.0],
        }, {
            name: 'Nuclear: Operating',
            data: [0, 0, 0, 0, 513.1],
        }, {
            name: 'Nuclear: Kept open',
            data: [0, 0, 0, 0, 67.1],
        }, {
            name: 'Nuclear: At risk',
            data: [0, 0, 0, 0, 135.1],
        }, {
            name: 'Nuclear: Retiring',
            data: [0, 0, 0, 0, 89.6],
        }, {
            name: 'Nuclear: Shut down',
            data: [0, 0, 0, 0, 38.1],
        }
    ]},

    function(chart) { // on complete
      chart.renderer.image()
        .add();
    });

  });