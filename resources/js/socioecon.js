let chart1 = document.getElementById('chart1')
let chart2 = document.getElementById('chart2')
let chart3 = document.getElementById('chart3')
let chartContainer = document.getElementById('container')

let gini = {
    chart: {
        type: 'bar',
        marginLeft: 175
    },
    title: {
        text: 'Gini Index by State, 2014-2018'
    },
    yAxis: {
        title: {
            text: 'Gini Score'
        },
        min: 0,
        max: 60,
        ticklength: 5
    },
    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        min: 0,
        max: 25,
        scrollbar: {
            enabled: true
        },
        tickLength: 0
    },
    data: {
        csvURL: 'https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/US_Gini_edit.csv'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: false
            }
        }
    },
    legend: {
        enabled: false
    }
}

let hc = Highcharts.chart('container', gini)

document.addEventListener('DOMContentLoaded', hc);

chart1.addEventListener('click', function() {hc.update({
    data: {
      csvURL: 'https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/US_Gini_edit.csv'
    },
    title: {
        text: 'Gini Index by State, 2014-2018'
    },
    yAxis: {
        title: {
            text: 'Gini Score'
        }}
  })})

chart2.addEventListener('click', function() {hc.update({
    data: {
      csvURL: 'https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/US_poverty_edit.csv'
    },
    title: {
        text: 'Poverty by State, 2014-2018'
    },
    yAxis: {
        title: {
            text: '% in Poverty'
        }}
  })})

chart3.addEventListener('click', function() {hc.update({
    data: {
      csvURL: 'https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/US_BA_edit.csv'
    },
    title: {
        text: 'Bachelor Degrees by State, 2014-2018'
    },
    yAxis: {
        title: {
            text: "% Received Bachelor's Degree"
        }}
  })})
