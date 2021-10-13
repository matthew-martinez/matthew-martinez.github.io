let line = document.getElementById('line');
let lifeData = dl.csv('https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/LifeTablesAge0AllStates.csv');

let processedArray = [];
let processedData = [];
let  j = 0;

function getData() {
    for (i = 0; i < lifeData.length; i++) {
        processedArray.push(lifeData[i].ex);
        j++;
        if (j % 60 === 0){
            if (lifeData[i].Abbreviation === "CT")
            {
                processedData.push({name: lifeData[i].State, data: processedArray, color: '#0276c3', zIndex:1})
            }
            else if (lifeData[i].Abbreviation === "OK"){
                processedData.push({name: lifeData[i].State, data: processedArray, color: '#f90107', zIndex:1})
            } else {
                processedData.push({name: lifeData[i].State, data: processedArray, color: '#A9A9A9', zIndex:0})
            }
            processedArray = [];
            j = 0;
        }
    }
}

getData();

Highcharts.chart('line', {

    title: {
        text: 'U.S. Life Expectancy by State'
    },

    subtitle: {
        text: '1959-2018'
    },

    yAxis: {
        title: {
            text: 'Life Expectancy at Birth (years)'
        },
        min: 65,
        max: 82
    },

    xAxis: {
        title: {
            text: "Calendar Year"
        },
        accessibility: {
            rangeDescription: 'Range: 1959 to 2018'
        }
    },

    legend: {
        enabled: false,
    },

    tooltip: {
        useHTML: true,
        formatter: function() {
            return '<b>' + this.point.x + '</b>' + '<br> <b>State:</b> ' + this.series.name + '<br> <b>Life Expectancy: </b>' + Math.round(this.point.y*10)/10;
        },
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            lineWidth: 1.5,
            marker: {
                enabled: 0,
            },
            pointStart: 1959
            }
          },

          legend: {
            align: 'right',
            verticalAlign: 'right',
            layout: 'vertical',
            x: 120,
            y: 280,
            symbolPadding: 0,
            symbolWidth: 0.1,
            symbolHeight: 0.1,
            symbolRadius: 0,
            useHTML: true,
            symbolWidth: 0,
            labelFormatter: function() {
              if(this.name=="Connecticut"){
                return '<div style="width:200px;"><img src = "" width = "10px" height = "10px" style="background-color:' + this.color + ';">' + " Connecticut" + '</div>';
              }
             if(this.name=="Oklahoma"){
                return '<div style="width:200px;"><img src = "" width = "10px" height = "10px" style="background-color:' + this.color + ';">' + " Oklahoma" + '</div>';
             }
      
            },
            itemStyle: {
              color: '#000000',
              //fontWeight: 'bold',
              fontSize: '11px'
            }
          },

    series: processedData,
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            }
        }]
    }
});