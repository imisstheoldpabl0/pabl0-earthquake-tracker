
// EJERCICIO 1

function getMyLocation() {
    navigator.geolocation.getCurrentPosition(position => {

        let myLat = position.coords.latitude; // guarda my latitud
        let myLong = position.coords.longitude; // guarda mi longitud

        //console.log(myLat, myLong); // saca a consola las posiciones en lat y long

        const map = L.map('map').setView([myLat, myLong], 13); // mapea con las variables guardadas

        // Se rellena el mapa
        L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', { // selecciona la preview que se le pide
            maxZoom: 25,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.popup()
            .setLatLng([myLat, myLong])
            .setContent("Estás aquí.")
            .openOn(map);

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Has pinchado en: " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);
    })
}

getMyLocation();

// EJERCICIO 2

/* TERREMOTOS */

async function getEarthquakes() {

    let terremotos = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    let data = await terremotos.json()

    let all = data.features; // FEATURES

    let title = data.features[0].properties.title; // TITULO

    let date = data.features[0].properties.time; // FECHA EVENTO
    date = Date(date)

    let lat = data.features[0].geometry.coordinates[0]; // LAT

    let long = data.features[0].geometry.coordinates[1]; // LONG

    let mag = data.features[0].properties.mag; // MAGNITUD


    //return {all, title, date, lat, long, mag}
    return data.features;
}
getEarthquakes();



/* PINTAR EN MAPA */
async function getLocationUS() {

    let usLat = 34.03028282423628; // se establece la latitud de LA
    let usLong = -118.26209212548974; // se establece la longitud de LA



    // SE RELLENA EL MAPA
    const map2 = L.map('map2').setView([usLat, usLong], 2); // mapea con las variables guardadas
    await L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', { // selecciona la preview que se le pide
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2);

    let data = await getEarthquakes();

    console.log(data.length);
    console.log(data);
    console.log(data[0]);

    let latitude = data[0].geometry.coordinates[0]; // LAT
    let longitude = data[0].geometry.coordinates[1]; // LONG

    console.log(latitude);
    console.log(longitude);

    let titles = [];
    let dates = [];
    let longitudes = [];
    let latitudes = [];
    let magnitudes = [];

    for (let i = 0; i < data.length; i++) {

        titles.push(data[i].properties.title); // titulos
        dates.push(Date(data[i].properties.time)); // fechas

        longitudes.push(data[i].geometry.coordinates[0]); // longitudes
        latitudes.push(data[i].geometry.coordinates[1]); // longitudes

        magnitudes.push(data[i].properties.mag) // magnitudes

    }

    //console.log(magnitudes);



}

getLocationUS();








