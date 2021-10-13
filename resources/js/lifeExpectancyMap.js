let data = Highcharts.geojson(Highcharts.maps['countries/us/us-all']);
const separators = Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline');
let mapSelection = "United States";

let housingDataState = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/housingDataState.csv');
let housingDataStateYearly = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/housingDataStateYearly.csv');
let lifeData = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/LifeTablesAge0AllStates.csv');
let policyData = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/NIAPolicyChange.csv')

// function to select specific state to only map that single state
let lifeDataUS = [69.94,69.84,70.24,70.12,69.96,70.22,70.25,70.2,70.52,70.22,70.48,70.75,71.1,71.19,71.4,71.97,72.53,72.84,73.21,73.39,73.81,73.71,74.1,74.47,74.56,74.69,74.66,74.74,74.88,74.85,75.13,75.39,75.54,75.8,75.59,75.77,75.88,76.2,76.53,76.69,76.68,76.8,76.94,77.03,77.18,77.58,77.58,77.85,78.1,78.2,78.54,78.73,78.8,78.94,78.96,79.03,78.88,78.86,78.83,78.99];

let processedLifeData = [];

function getYearly(state) {
    for (i = 0; i < lifeData.length; i++) {  
        if (lifeData[i].State === state){  
            processedLifeData.push(lifeData[i].ex);
        }
    }
}
  
// Line chart for time trends
let line = Highcharts.chart('line', {

    title: {
      text: 'Life Expectancy at Birth'
    },
  
    subtitle: {
      text: ' Connecticut and Oklahoma'
    },
  
    yAxis: {
      title: {
        text: 'Life Expectancy (years)'
      },
      min: 65,
      max: 85,
      tickInterval: 5
    },
  
    xAxis: {
    title: {
        text: 'Year'
    },
      accessibility: {
        rangeDescription: 'Range: 1959 to 2018'
      },
      tickInterval: 10
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
        marker: {
            enabled: false
        },
        pointStart: 1959
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

    tooltip: {
        useHTML: true,
        formatter: function() {
            return '<b>' + this.point.x + '</b>' + '<br> <b>State:</b> ' + this.series.name + '<br> <b>Life Expectancy: </b>' + Math.round(this.point.y*10)/10;
        },
    },

    series: [{
        name: "Oklahoma",
        data:  [71.13,70.79,71.15,71,70.92,71.16,71.65,71.27,71.42,71.26,71.25,71.06,71.94,71.67,71.91,72.11,72.37,72.66,73.2,72.99,73.51,73.58,73.77,73.69,74.3,74.58,74.54,74.62,75.05,74.88,75.12,74.97,75.1,75.25,74.7,74.84,74.88,75.06,74.96,75.15,75.02,75.03,75.3,75.06,75.07,75.45,75.07,75.39,75.31,75.14,75.65,75.71,75.7,75.91,75.7,75.77,75.69,75.82,75.78,75.95],
        color: '#7bccc4'                       
        },
        {
        name: "Connecticut",
        data: [71.09,71.05,71.41,71.11,70.99,71.48,71.44,71.47,71.73,71.64,72.18,72.57,72.9,72.99,73.22,73.65,74.02,74.31,74.73,74.89,75.18,74.93,75.39,75.6,75.9,75.86,75.91,76.11,76.26,76.28,76.47,77.12,77.19,77.32,77.08,77.02,77.3,77.57,77.92,78.03,78.44,78.25,78.62,78.73,79.1,79.35,79.52,79.7,80.07,80.28,80.51,80.71,80.7,80.88,80.96,81.1,80.82,80.87,80.7,80.86],
        color: '#084081'
    }]

  });

// Set drilldown pointers
data.forEach((d, i) => {
    d.drilldown = d.properties['hc-key'];
    d.value = i;
  });
  
  for (i = 0; i < data.length; i++){
    for (j = 0; j < policyData.length; j++){
        if (data[i].name === policyData[j].state) {
            data[i].value = policyData[j].Difference; // change to column that you want to display on the map
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

let rentProps = {
    chart: {
    events: {
            drilldown: function (e) {
                this.setTitle(null, { text: '1970-2014' });
                mapSelection = e.point.name;
                processedLifeData = []
                getYearly(mapSelection)
                let statement = `Connecticut and ${mapSelection}`;
                line.update({
                    series: [{
                        name: e.point.name,
                        data: processedLifeData,
                        color: '#7bccc4'    
                    },
                    {
                        name: "Connecticut",
                        data: [71.09,71.05,71.41,71.11,70.99,71.48,71.44,71.47,71.73,71.64,72.18,72.57,72.9,72.99,73.22,73.65,74.02,74.31,74.73,74.89,75.18,74.93,75.39,75.6,75.9,75.86,75.91,76.11,76.26,76.28,76.47,77.12,77.19,77.32,77.08,77.02,77.3,77.57,77.92,78.03,78.44,78.25,78.62,78.73,79.1,79.35,79.52,79.7,80.07,80.28,80.51,80.71,80.7,80.88,80.96,81.1,80.82,80.87,80.7,80.86],
                        color: '#084081'
                    }],
                    title: {
                        text: "Life Expectancy at Birth"
                    },
                    subtitle: {
                        text: statement
                    },
                    yAxis: {
                        title: {
                            text: 'Life Expectancy (years)'
                        }}
                    })
                },
        }
    },

    title: {
        text: 'Change in Liberal Policy Score Change'
    },

    subtitle: {
        text: '1970-2014'
    },
        colorAxis: {
            dataClasses: [{
                to: -0.1729664,
                color: '#01665e', // #ccebc5
            }, {
                from: -0.1729664,
                to: .0,
                color: '#35978f', // #7bccc4
            }, {
                from: 0,
                to: 0.1729664,
                color: '#2b8cbe', // #2b8cbe
            }, {
                from: 0.1729664,
                color: '#084081', // #084081
            }]
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
    legend: {
        title: {
            text: "Liberal Policy Score Change"
        }
    },
    series: [{
        data: data,
        name: 'United States'
    }, {
        type: 'mapline',
        data: separators,
        color: 'silver',
        enableMouseTracking: false,
        animation: {
            duration: 200
        }
    }],
}

let housingMap = new Highcharts.mapChart('map', rentProps)
document.addEventListener('DOMContentLoaded', housingMap);

