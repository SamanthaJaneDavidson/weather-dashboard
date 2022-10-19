var APIKey = "d97fe2285b7bc123de0716fce9e4ac7a"
var currentWeatherReport = document.querySelector(`#current-weather-report`);
var forecastWeatherReport = document.querySelector(`#forecast-weather-report`);
var cityInput = document.querySelector("#city");
var searchButton = document.querySelector("#search")
var citySearchesEl = document.querySelector("#city-search-links")
var city = ``;

//Search for city
var searchCity = function (event) {

    if (event.target.value !== "search"){
        city = event.target.value;
    }
    else {
        city = cityInput.value.trim();
    }

    if (city) {
        getLongLat(city);
        var storedCities = {
            city: city
        };
    } else {
        alert(`Please enter a valid city`);
    }

        var existing = false
        for(var i = 0; i < cities.length; i++ ){
            if (cities[i].city == storedCities.city){
                existing = true 
            }
        }

        if(existing == false){
            cities.push(storedCities)
        }

        localStorage.setItem("cities", JSON.stringify(cities))

        // } else {
        //     alert(`Please enter a valid city`);
        // }

    renderCitySearches()
};

// //Display city search links 
var cities = JSON.parse(localStorage.getItem("cities")) || [];

function renderCitySearches () {

    if(cities !== null) {
        document.getElementById("city-search-links").innerHTML = cities;
    } else {
        return;
    }

    citySearchesEl.innerHTML = ``;

    for(var i = 0; i < cities.length; i++) {
        console.log(cities[i]);
        var citySearchEl = document.createElement("button");
        citySearchEl.textContent = cities[i].city;
        citySearchEl.value = cities[i].city;
        citySearchesEl.append(citySearchEl);
        citySearchEl.addEventListener('click', searchCity);
    }
}
    renderCitySearches();

// Event listener for search button to save scores and go to geo conversion 
searchButton.addEventListener(`click`, function (event) {
    event.preventDefault();
    searchCity(event);
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
            displayForecast(data)
        })
    };
    
//Display current weather forecast

var displayCurrentWeather = function (data) {

    currentWeatherReport.innerHTML = ``; 

        var cityName = document.createElement(`h2`);
        var currentDate = document.createElement(`h4`);
        var weatherIcon = document.createElement(`img`);
        var currentTemp = document.createElement(`li`);
        var currentWind = document.createElement(`li`);
        var currentHumidity  = document.createElement(`li`);

        var date = new Date(data.current.dt * 1000);
        console.log(date);

        cityName.textContent = city;
        currentDate.textContent = date; 
        weatherIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
        currentTemp.textContent = "Temperature: " + data.current.temp;
        currentWind.textContent = "Wind Speed: " + data.current.wind_speed;
        currentHumidity.textContent = "Humidity: " + data.current.humidity;

        currentWeatherReport.append(cityName);
        currentWeatherReport.append(currentDate);
        currentWeatherReport.append(weatherIcon);
        currentWeatherReport.append(currentTemp);
        currentWeatherReport.append(currentWind);
        currentWeatherReport.append(currentHumidity);

    };


//Get 5 day forecast 
var displayForecast = function (data) {

    forecastWeatherReport.innerHTML = ``;

    for (var i = 1; i < 6; i++) {
    
    var div = document.createElement('div');
    div.classList.add('card');
    var forecastDate = document.createElement(`h4`);
    var forecastIcon = document.createElement(`img`);
    var forecastTemp = document.createElement(`li`);
    var forecastWind = document.createElement(`li`);
    var forecastHumidity  = document.createElement(`li`);

    var date = new Date(data.daily[i].dt * 1000);
        console.log(date);

    forecastDate = date; //need to do a date conversion 
    forecastIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
    forecastTemp.textContent = "Temperature: " + data.daily[i].temp.day;
    forecastWind.textContent = "Wind Speed: " + data.daily[i].wind_speed;
    forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity;

    div.append(forecastDate);
    div.append(forecastIcon);
    div.append(forecastTemp);
    div.append(forecastWind);
    div.append(forecastHumidity);

    forecastWeatherReport.append(div);
};
}