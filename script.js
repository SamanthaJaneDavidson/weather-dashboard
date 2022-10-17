var APIKey = "d97fe2285b7bc123de0716fce9e4ac7a"
var currentWeatherReport = document.querySelector(`#current-weather-report`);
var fiveDayreport = document.querySelector(`#five-day-report`);
var cityInput = document.querySelector("#city");
var searchButton = document.querySelector("#search")
var citySearchesEl = document.querySelector("#city-search-links")



//Save city search links 
var cities = JSON.parse(localStorage.getItem("cities")) || [];


//Search for city
var searchCity = function (event) {

    var city = cityInput.value.trim();
    console.log(city)

    if (city) {
        getLongLat(city);
        var storedCities = {
            city: city
        };

        cities.push(storedCities)
        localStorage.setItem("cities", JSON.stringify(cities))
    } else {
        alert(`Please enter a valid city`);
    }
    
};


// //Display city search links 
function renderCitySearches () {
    var savedSearches = JSON.parse(localStorage.getItem("cities"));
    console.log(savedSearches);

    if(savedSearches !== null) {
        document.getElementById("city-search-links").innerHTML = savedSearches;
    } else {
        return;
    }

    for(var i = 0; i < 10; i++) {
        console.log(savedSearches[i]);
        var citySearchesEl = document.createElement("li");
        citySearchesEl.setAttribute("href", savedSearches[i].html_url);
        citySearchesEl.append(savedSearches);
    }
}
    renderCitySearches();

// Event listener for search button to save scores and go to geo conversion 
searchButton.addEventListener(`click`, function (event) {
    event.preventDefault();
    searchCity();
});


//City to long/lat geocoding converstion 
function getLongLat(city){
    var geoCodingUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d97fe2285b7bc123de0716fce9e4ac7a";

    fetch(geoCodingUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lon = data.coord.lon
            var lat = data.coord.lat
            getCurrentWeather(lat, lon);
        })
}


//Get current weather forecast
var getCurrentWeather = function (lat, lon) {
    var currentRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d97fe2285b7bc123de0716fce9e4ac7a";

    fetch(currentRequestUrl)
        .then(function (response) {
            return response.json();
    }) 
        .then(function (data) {
            console.log(data);
            displayCurrentForcast(data.list);
        })
    };
    
//Display current weather forecast
var displayCurrentForcast = function (data) {
    for(var i = 0; i < data.length; i++) {

        var cityName = document.createElement(`h2`);
        var currentDate = document.createElement(`h2`);
        var weatherIcon = document.createElement(`div`);
        var currentTemp = document.createElement(`p`);
        var currentWind = document.createElement(`p`);
        var currentHumidity  = document.createElement(`p`);

        cityName.textContent = city
        // currentDate = moment().format (`L`);
        weatherIcon = data[i].weather.icon;
        currentTemp = data[i].main.temp;
        currentWind = data[i].wind.speed;
        currentHumidity = data[i].main.humidity;

        currentWeatherReport.append(cityName);
        // currentWeatherReport.append(currentDate);
        currentWeatherReport.append(weatherIcon);
        currentWeatherReport.append(currentTemp);
        currentWeatherReport.append(currentWind);
        currentWeatherReport.append(currentHumidity);
        }
    };


//Get 5 day forecast 

// var fiveDayRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "";

//use dt_txt for date