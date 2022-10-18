var APIKey = "d97fe2285b7bc123de0716fce9e4ac7a"
var currentWeatherReport = document.querySelector(`#current-weather-report`);
var forecastWeatherReport = document.querySelector(`#forecast-weather-report`);
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
        var citySearchEl = document.createElement("a");
        // citySearchEl.setAttribute("href", ) 
        citySearchEl.textContent = savedSearches[i].city;
        citySearchesEl.append(citySearchEl);
       
        //not sure how to make these into links to search again and also take out dups
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
            displayCurrentWeather(data);
            day1Forecast(data) //change to full 5 day if possible 
        })
    };
    
//Display current weather forecast

var displayCurrentWeather = function (data) {

        var cityName = document.createElement(`h2`);
        var currentDate = document.createElement(`h2`);
        var weatherIcon = document.createElement(`img`);
        var currentTemp = document.createElement(`li`);
        var currentWind = document.createElement(`li`);
        var currentHumidity  = document.createElement(`li`);

        cityName.textContent = city;
        currentDate = data.current.dt; //will need to do date conversion
        weatherIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
        currentTemp = data.current.temp;
        currentWind = data.current.wind_speed;
        currentHumidity = data.current.humidity;

        currentWeatherReport.append(cityName);
        currentWeatherReport.append(currentDate);
        currentWeatherReport.append(weatherIcon);
        currentWeatherReport.append(currentTemp);
        currentWeatherReport.append(currentWind);
        currentWeatherReport.append(currentHumidity);

        var dateConversion = new Date(currentDate).toLocaleDateString("en-US");
        console.log(dateConversion);

    };


//Get 5 day forecast 
// var displayForecast = function (data) {

//     for (var i = 0; i < 4; i++)

//     var forecastDate = document.createElement(`h2`);
//     var forecastIcon = document.createElement(`h3`);
//     var forecastTemp = document.createElement(`li`);
//     var forecastWind = document.createElement(`li`);
//     var forecastHumidity  = document.createElement(`li`);

//     currentDate = data.daily[i].dt; //need to do a date conversion 
//     forecastIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily.weather[0].icon + ".png")
//     forecastTemp = data.daily[i].temp;
//     forecastWind = data.daily[i].wind_speed;
//     forecastHumidity = data.daily[i].humidity;

//     forecastWeatherReport.append(forecastDate);
//     forecastWeatherReport.append(forecastIcon);
//     forecastWeatherReport.append(forecastTemp);
//     forecastWeatherReport.append(forecastWind);
//     forecastWeatherReport.append(forecastHumidity);
// };


var day1Forecast = function (data) {

    var forecastDate = document.createElement(`h2`);
    var forecastIcon = document.createElement(`img`);
    var forecastTemp = document.createElement(`li`);
    var forecastWind = document.createElement(`li`);
    var forecastHumidity  = document.createElement(`li`);

    forecastDate = data.daily[0].dt; //need to do a date conversion 
    forecastIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png")
    forecastTemp = data.daily[0].temp.day;
    forecastWind = data.daily[0].wind_speed;
    forecastHumidity = data.daily[0].humidity;

    forecastWeatherReport.append(forecastDate);
    forecastWeatherReport.append(forecastIcon);
    forecastWeatherReport.append(forecastTemp);
    forecastWeatherReport.append(forecastWind);
    forecastWeatherReport.append(forecastHumidity);
};