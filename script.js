/* Earthquake Data */

async function getEarthquakes() {

    let terremotos = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    let data = await terremotos.json()
    return data.features;
}
getEarthquakes();


/* FILL THE MAP */
async function drawMap() {

    let myLat = 40.416764775202175; // Madrid's Plaza del Sol (km 0) latitude established as map's center
    let myLong = -3.703364006215899; // Madrid's Plaza del Sol (km 0) longitude established as map's center


    /* LEAFLET */
    const map2 = L.map('map2').setView([myLat, myLong], 2); // Sets the initial view as Madrid
    await L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png', { // Layer of personalization to map
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2);

    let data = await getEarthquakes(); // Retrieves all data from API

    let titles = [];
    let dates = [];
    let longitudes = [];
    let latitudes = [];
    let magnitudes = [];
    let magnitudesRadios = [];
    let magType = "";
    let place = "";
    let depth = [];


    /* Iterates on all data to apply to each earthquake event */
    for (let i = 0; i < data.length; i++) {


        titles.push(data[i].properties.title); // Titles
        dates.push(Date(data[i].properties.time)); // Dates

        longitudes.push(data[i].geometry.coordinates[1]); // Longitudes
        latitudes.push(data[i].geometry.coordinates[0]); // Latitudes

        magnitudes.push(data[i].properties.mag) // Magnitudes

        magnitudesRadios = (data[i].properties.mag) * 70000; // Magnitudes adapted to define location circle radii

        magType = data[i].properties.magType; // Magnitude type

        place = data[i].properties.place; // Location

        depth.push(data[i].geometry.coordinates[2]); // Depth in km


        /* Declaring circle color depending on magnitude */
        function magnitudColor () {
            if (magnitudes[i] <= 0) {
                return 'white';
            } else if (magnitudes[i] > 0 && magnitudes[i] <= 1) {
                return 'grey';
            } else if (magnitudes[i] > 1 && magnitudes[i] <= 2) {
                return 'chartreuse';
            } else if (magnitudes[i] > 2 && magnitudes[i] <= 3) {
                return 'darkgreen';
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

        /* Earthquakes' locations */
        const circle = L.circle([longitudes[i], latitudes[i]], {
            stroke: false,
            color: magnitudColor(),
            fillColor: magnitudColor(),
            fillOpacity: 0.25,
            radius: magnitudesRadios,

        }).addTo(map2);

        /* Popups on location show earthquakes data */

        const popup = L.popup()
            .setLatLng([longitudes[i], latitudes[i]])
            .setContent(`${titles[i]} <br> <b>Date:</b> ${dates[i]} <br> <b>Place:</b> ${place} <br> <b>Magnitud:</b> ${magnitudes[i]}${magType}<br><b>Depth:</b> ${depth[i]}km`)
            .openOn(map2);

        circle.bindPopup(popup)

    }
    console.log(magnitudes);
    }

drawMap();








