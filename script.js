
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


    let titles = [];
    let dates = [];
    let longitudes = [];
    let latitudes = [];
    let magnitudes = [];
    let magnitudesRadios = [];

    for (let i = 0; i < data.length; i++) {


        titles.push(data[i].properties.title); // titulos
        dates.push(Date(data[i].properties.time)); // fechas

        longitudes.push(data[i].geometry.coordinates[1]); // longitudes
        latitudes.push(data[i].geometry.coordinates[0]); // longitudes

        magnitudes.push(data[i].properties.mag) // magnitudes


        magnitudesRadios = (data[i].properties.mag) * 100000;

        function magnitudColor () {
            if (magnitudes[i] <= 0) {
                return 'white';
            } else if (magnitudes[i] > 0 && magnitudes[i] <= 1) {
                return 'grey';
            } else if (magnitudes[i] > 1 && magnitudes[i] <= 2) {
                return 'chartreuse';
            } else if (magnitudes[i] > 2 && magnitudes[i] <= 3) {
                return 'darkolivegreen';
            } else if (magnitudes[i] > 3 && magnitudes[i] <= 4) {
                return 'gold';
            } else if (magnitudes[i] > 4 && magnitudes[i] <= 5) {
                return 'goldenrod';
            } else if (magnitudes[i] > 5 && magnitudes[i] <= 6) {
                return 'orange';
            } else if (magnitudes[i] > 6 && magnitudes[i] <= 7) {
                return 'red'
            } else if (magnitudes[i] > 7) {
                return 'deeppink';
            } else {
                return 'red';
            }
        }

        const circle = L.circle([longitudes[i], latitudes[i]], {
            color: magnitudColor(),
            fillColor: magnitudColor(),
            fillOpacity: 0.25,
            radius: magnitudesRadios,

        }).addTo(map2);

        const popup = L.popup()
            .setLatLng([longitudes[i], latitudes[i]])
            .setContent(`${titles[i]}, <br> ${dates[i]}, <br> Lat: ${longitudes[i]}, Long: ${latitudes[i]}, <br> ${magnitudesRadios}`)
            .openOn(map2);

        circle.bindPopup(popup)

    }
    console.log(magnitudes);
    }

getLocationUS();








