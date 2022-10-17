var APIKey = "d97fe2285b7bc123de0716fce9e4ac7a"
var currentWeatherReport = document.querySelector(`#current-weather-report`);
var fiveDayreport = document.querySelector(`#five-day-report`);
var cityInput = document.querySelector("#city");
var searchButton = document.querySelector("#search")
var citySearchesEl = document.querySelector("#city-search-links")
var city = ``;


//Search for city
var searchCity = function (event) {

    city = cityInput.value.trim();
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
var cities = JSON.parse(localStorage.getItem("cities")) || [];

function renderCitySearches () {
    var savedSearches = JSON.parse(localStorage.getItem("cities"));
    console.log(savedSearches);

    if(savedSearches !== null) {
        document.getElementById("city-search-links").innerHTML = savedSearches;
    } else {
        return;
    }

    citySearchesEl.innerHTML = ``;
    
    for(var i = 0; i < 10; i++) {
        console.log(savedSearches[i]);
        var citySearchEl = document.createElement("li");
        citySearchEl.textContent = savedSearches[i].city;
        // citySearchesEl.setAttribute("href", savedSearches[i].html_url);
        citySearchesEl.append(citySearchEl);
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
    var currentRequestUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=d97fe2285b7bc123de0716fce9e4ac7a" + "&units=imperial";

    fetch(currentRequestUrl)
        .then(function (response) {
            return response.json();
    }) 
        .then(function (data) {
            console.log(data);
            displayCurrentForcast(data);
        })
    };
    
//Display current weather forecast

var displayCurrentForcast = function (data) {
    // for(var i = 0; i < data.length; i++) {

        var cityName = document.createElement(`h2`);
        // var currentDate = document.createElement(`h2`);
        var weatherIcon = document.createElement(`h3`);
        var currentTemp = document.createElement(`li`);
        var currentWind = document.createElement(`li`);
        var currentHumidity  = document.createElement(`li`);

        cityName.textContent = city;
        //currentDate = add momment date 
        weatherIcon = data.current.weather[0].icon; 
        currentTemp = data.current.temp;
        currentWind = data.current.wind_speed;
        currentHumidity = data.current.humidity;

        currentWeatherReport.append(cityName);
        // currentWeatherReport.append(currentDate);
        currentWeatherReport.append(weatherIcon);
        currentWeatherReport.append(currentTemp);
        currentWeatherReport.append(currentWind);
        currentWeatherReport.append(currentHumidity);
        // }
    };


//Get 5 day forecast 
