var map = L.map('map').setView([39.8283, -98.5795], 3.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

function getLong() {
    return getRandomInRange(-90,-100,3)
}

function getLat(){
    return getRandomInRange(30, 35, 3)
}

function generateMarkers(){

    for (let i = 1; i < 4; i++){
        var lat = getLat();
        var long = getLong();
        var marker = L.marker([lat, long]).addTo(map);
        var h2Element = document.querySelector(`#marker${i} h2`)
        h2Element.innerHTML += `Latitude: ${lat}, Longitude: ${long}`;
        getLocality(lat,long, `marker${i}`);
    }
}

function getLocality(lat, long, id){

    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
        .then(response => {return response.json()})
        .then(data => {
            document.getElementById(id).innerHTML += "Locality: " + data.locality
        });

}

generateMarkers()
