let data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
const separators = Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline');
let mapSelection = "United States";
let instructions = document.getElementById('instructions');
let housingDataState = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/housingDataState.csv');
let housingDataCounty = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/housingDataCounty.csv');
let housingDataStateYearly = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/housingDataStateYearly.csv');

// function to select specific state to only map that single state
let USTimeDataOwners = [24.9, 25.1, 25.1, 25.0, 25.1, 24.7, 23.7, 22.8, 22.5, 22.0, 21.5, 21.2, 21.2, 20.8];
let USTimeDataRenters = [29.9, 29.7, 29.9, 30.8, 31.6, 31.9, 31.1, 30.8, 31.0, 30.3, 29.9, 29.8, 29.9, 29.3];

let processedTimeDataOwners = []
let processedTimeDataRenters = []

function getYearly(state) {
    for (i = 0; i < housingDataStateYearly.length; i++) {  
        console.log(i);
        if (housingDataStateYearly[i].State === state){  
            console.log(state);
            console.log(housingDataStateYearly[i].State);
            processedTimeDataOwners.push(housingDataStateYearly[i].mortPercE);
            processedTimeDataRenters.push(housingDataStateYearly[i].rentPercE);
        }
    }
}

function zeroPad(num) {
    return num.toString().padStart(5, "0");
  }
  
for (i = 0; i < housingDataCounty.length; i++) {      
    housingDataCounty[i].GEOID = zeroPad(housingDataCounty[i].GEOID);
}

// Add an onclick function that takes csvData and filters it based on state clicked on

// Set drilldown pointers
data.forEach((d, i) => {
    d.drilldown = d.properties['hc-key'];
    d.value = i;
});

for (i = 0; i < data.length; i++){
    for (j = 0; j < housingDataState.length; j++){
        if (data[i].name === housingDataState[j].State) {
            data[i].value = housingDataState[j].rentPercE; // change to column that you want to display on the map
        }
    }
}

// modify value with the column of choice from housingDataState
function getScript(url, cb) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = cb;
    document.head.appendChild(script);
}

// Instantiate the map
Highcharts.mapChart('map', {
    chart: {
        events: {
            drilldown: function (e) {
                if (!e.seriesOptions) {
                    const chart = this,
                        mapKey = 'countries/us/' + e.point.drilldown + '-all';

                    // Handle error, the timeout is cleared on success
                    let fail = setTimeout(() => {
                        if (!Highcharts.maps[mapKey]) {
                            chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                            fail = setTimeout(() => {
                                chart.hideLoading();
                            }, 1000);
                        }
                    }, 3000);

                    // Show the spinner
                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                    // Load the drilldown map
                    getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', () => {
                        data = Highcharts.geojson(Highcharts.maps[mapKey]);

                        // Set a non-random bogus value - modify value with county data from housingDataCounty
                        data.forEach((d, i) => {
                            d.value = i;
                        });
                        for (i = 0; i < data.length; i++){
                            for (j = 0; j < housingDataCounty.length; j++){
                                if (data[i].properties.fips === housingDataCounty[j].GEOID) {
                                    data[i].value = housingDataCounty[j].rentPercE; // change to column that you want to display on the map
                                }
                            }
                        }
                        // Hide loading and add series
                        chart.hideLoading();
                        clearTimeout(fail);
                        chart.addSeriesAsDrilldown(e.point, {
                            name: e.point.name,
                            data: data,
                            dataLabels: {
                                enabled: false,
                                format: '{point.name}'
                            }
                        });
                    });
                }

                this.setTitle(null, { text: e.point.name });
                mapSelection = e.point.name;
                console.log(mapSelection)

                processedTimeDataOwners = []
                processedTimeDataRenters = []
                getYearly(mapSelection)
                console.log(processedTimeDataOwners)
                let statement = `Renting and Owning in ${mapSelection}, 2006-2019`
                line.update({
                    series: [{
                        name: "Owning",
                        data: processedTimeDataOwners,
                        color: '#084081'
                    },
                    {
                        name: "Renting",
                        data: processedTimeDataRenters,
                        color: '#7bccc4'
                    }],
            title: {
                text: statement
            },
            yAxis: {
                title: {
                    text: ''
                }}
            })
            },


            drillup: function () {
                this.setTitle(null, { text: '' });
                mapSelection = "United States"; // change to US when new data is in
                
                let statement = `Renting and Owning in ${mapSelection}, 2006-2019`
                line.update({
                    series: [{
                        name: "Owning",
                        data: USTimeDataOwners,
                        color: '#084081'
                    },
                    {
                        name: "Renting",
                        data: USTimeDataRenters,
                        color: '#7bccc4'
                    }],
            title: {
                text: statement
            },
            yAxis: {
                title: {
                    text: ''
                }}
            })


            }
        }
    },

    title: {
        text: 'Percent of Income Spent on Rent'
    },

    subtitle: {
        text: '',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px'
        }
    },

    colorAxis: {
        min: 20,
        max: 35,
        minColor: '#a8ddb5',
        maxColor: '#0868ac'
    },

    mapNavigation: {
        enabled: false,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    plotOptions: {
        map: {
            states: {
                hover: {
                    borderColor: '#ffffff'
                }
            }
        }
    },

    series: [{
        data: data,
        name: 'United States',
        dataLabels: {
            enabled: false,
            format: '{point.properties.postal-code}'
        }
    }, {
        type: 'mapline',
        data: separators,
        color: 'silver',
        enableMouseTracking: false,
        animation: {
            duration: 200
        }
    }],

    drilldown: {
        activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
        },
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                x: 0,
                y: 60
            }
        }
    }
});

// Line chart for time trends
let line = Highcharts.chart('line', {

    title: {
      text: 'Renting and Owning in the United States, 2006-2019'
    },
  
    subtitle: {
      text: ''
    },
  
    yAxis: {
      title: {
        text: ''
      }
    },
  
    xAxis: {
    title: {
        text: 'Year'
    },
      accessibility: {
        rangeDescription: 'Range: 2016 to 2019'
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'bottom',
      verticalAlign: 'bottom'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2006
      }
    },
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    series: [{
        name: "Owning",
        data: USTimeDataOwners,
        color: '#084081'
    },
    {
        name: "Renting",
        data: USTimeDataRenters,
        color: '#7bccc4'
    }]
  });