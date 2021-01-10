// grabbing document elements
let arson = document.getElementById('arson');
let assault = document.getElementById('assault');
let burglary = document.getElementById('burglary');
let homicide = document.getElementById('homicide');
let motorvehicletheft = document.getElementById('motorvehicletheft');
let robbery = document.getElementById('robbery');
let sexualbuse = document.getElementById('sexualabuse');
let theftauto = document.getElementById('theftauto');
let theftother = document.getElementById('theftother');
let instructions = document.getElementById('instructions');

let mymap = null;
let removed = false;

defaultMap = L.map('mapid').setView([38.9072, -77.0369], 12);

// add tileLayer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibS1tYXJ0IiwiYSI6ImNrajlhY3loZzBnbTAyem4wNmFpNXVqNzUifQ._1LnJ7_l8jZ-FjfqZX-ZGg'
}).addTo(defaultMap);

function doStuff(data) {
    csvData = data;
    return csvData;
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        header: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

function mapper(type) {
    mymap = L.map('mapid').setView([38.9072, -77.0369], 12);

        // add tileLayer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibS1tYXJ0IiwiYSI6ImNrajlhY3loZzBnbTAyem4wNmFpNXVqNzUifQ._1LnJ7_l8jZ-FjfqZX-ZGg'
    }).addTo(mymap);
    
    for (i = 0; i < csvData.length; i++){

        // add a marker
        // TYPES OF OFFENSES AND N SIZES
        //ARSON ASSAULT W/DANGEROUS WEAPON                   BURGLARY 
        //13                       1561                       1392 
        //HOMICIDE        MOTOR VEHICLE THEFT                    ROBBERY 
        //190                       3036                       1899 
        //SEX ABUSE               THEFT F/AUTO                THEFT/OTHER 
        // 157                       7814                      10283 
        
        if (csvData[i].OFFENSE === type){
            let circle = L.circle([csvData[i].LATITUDE, csvData[i].LONGITUDE], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 15
            }).addTo(mymap);
            // add a pop up box for marker
            circle.bindPopup(`BLOCK: ${csvData[i].BLOCK} <br>
                DATE: ${csvData[i].END_DATE} <br>
                SHIFT: ${csvData[i].SHIFT} <br>
                CRIME: ${csvData[i].OFFENSE}`)
        }
    }
    return mymap;
}

parseData("https://raw.githubusercontent.com/matthew-martinez/matthew-martinez.github.io/master/resources/data/Crime_Incidents_in_2020.csv", doStuff);

arson.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Arson</h3>";
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("ARSON");
})

assault.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Assault</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("ASSAULT W/DANGEROUS WEAPON");
})

burglary.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Burglary</h3>"

    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("BURGLARY")
})

homicide.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Homicide</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("HOMICIDE")
})

motorvehicletheft.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Motor Vehicle Theft</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("MOTOR VEHICLE THEFT")
})

robbery.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Robbery</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("ROBBERY")
})

sexualbuse.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Sexual Abuse</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("SEX ABUSE")
})

theftauto.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Theft (Auto)</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }

    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("THEFT F/AUTO")
})

theftother.addEventListener('click', function() {
    instructions.innerHTML = "<h3>Theft (Other)</h3>"
    if (removed === false){
        defaultMap.remove();
        removed = true;
    }
    
    if (mymap !== undefined && mymap !== null) {
        mymap.remove();
    }
    mapper("THEFT/OTHER")
})