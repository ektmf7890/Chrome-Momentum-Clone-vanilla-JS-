const weather = document.querySelector(".js-weather");

const API_KEY = "64c3adfe22ea073e7d2804ae55deaf98";

const COORDS_LS = 'coords'

function getWeather(lat, long){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            weather.innerText = `${json.main.temp}도, ${json.name}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;  
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(err){
    console.log(err);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null){
        askForCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();