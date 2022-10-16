var currentWeatherReport = document.querySelector(`#current-weather-report`);
var fiveDayreport = document.querySelector(`#five-day-report`);
var city = document.querySelector("#city");
var searchButton = document.querySelector("#search")
var citySearches = document.querySelector("#city-links")

//Search for city
var searchCity = function (event) {
    event.preventdefault();

    var city = city.value.trim();

    if (city) {
        getLongLat(city);

    } else {
        alert(`Please enter a valid city`);
    }
};


//Save city search links 
var cities = JSON.parse(localStorage.getItem("cities")) || [];

function storeCitySearches(){
    var storedCities = {
        city: city.value.trim()
    };
    cities.push(storedCities)
    localStorage.setItem("cities", JSON.stringify(cities))
}


//Display city search links 
function renderCitySearches () {
    var savedSearches = JSON.parse(localStorage.getItem("storedCities"));

    if(savedSearches !== null) {
        document.getElementById("city-links").innerHTML = savedSearches;
    } else {
        return;
    }
}

// Event listener for search button to save scores and go to geo conversion 
searchButton.addEventListener(`click`, function (event) {
    event.preventDefault();
    storeCitySearches();
    renderCitySearches();
    getLongLat();
});


//City to long/lat geocoding converstion 
function getLongLat(city){
    var geoCodingUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d97fe2285b7bc123de0716fce9e4ac7a";

    fetch(geoCodingUrl)
        .then(function (response) {
            response.json();
        })
        .then(function (data) {
            console.log(data);
        })

        //not sure how to define lon and lat here

       getCurrentWeather();
}


//Get current weather forecast
var getCurrentWeather = function () {
    var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +" &appid=d97fe2285b7bc123de0716fce9e4ac7a";

    fetch(currentRequestUrl)
        .then(function (response) {
            response.json();
    }) 
        .then(function (data) {
            console.log(data);
        })
    };
    
//Display current weather forecast
var displayCurrentForcast = function (city) {
    for(var i = 0; i < data.length; i++) {

        var cityName = document.createElement(`h2`);
        var currentDate = document.createElement(`h2`);
        var weatherIcon = document.createElement(`div`);
        var currentTemp = document.createElement(`p`);
        var currentWind = document.createElement(`p`);
        var currentHumidity  = document.createElement(`p`);

        cityName.textContent = city
        currentDate = moment().format (`L`);
        weatherIcon = data[i].weather.icon;
        currentTemp = data[i].main.temp;
        currentWind = data[i].wind.speed;
        currentHumidity = data[i].main.humidity;

        currentWeatherReport.append(cityName);
        currentWeatherReport.append(currentDate);
        currentWeatherReport.append(weatherIcon);
        currentWeatherReport.append(currentTemp);
        currentWeatherReport.append(currentWind);
        currentWeatherReport.append(currentHumidity);
        }
    };

//Get 5 day forecast 


// //API call for currernt weather 
// // var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api key}"

// //API call for 5 day forcast 
// var fiveDayRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api key}";
