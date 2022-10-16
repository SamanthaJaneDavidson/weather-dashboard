var currentWeatherReport = document.querySelector(`#current-weather-report`);
var fiveDayreport = document.querySelector(`#five-day-report`);
var city = document.querySelector("#city");
var searchButton = document.querySelector("#search")

//Search for city
var searchCity = function (event) {
    event.preventdefault();

    city.value();

    if (city) {
        getLongLat(city);

        currentWeatherReport.textContent = ` `;

    } else {
        alert(`Please enter a valid city and.`);
    }
};

//Event listener for search button to kick city to long/lat conversion 
searchButton.addEventListener(`click`, getLongLat);

//City to long/lat geocoding converstion 
function getLongLat(city){
    var geoCodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=d97fe2285b7bc123de0716fce9e4ac7a`;

    fetch(geoCodingUrl)
        .then(function (response) {
            response.json();
        })
        .then(function (data) {
            console.log(data)
        })

}

//Get current weather forcast
var getCurrentWeather = function (currentWeather) {
    var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=d97fe2285b7bc123de0716fce9e4ac7a";

    fetch(currentRequestUrl)
        .then(function (response) {
            response.json();
    }) 
        .then(function (data) {
            console.log(data);
            for(var i = 0; i < data.length; i++){

                //create
                var cityName = document.createElement(`h2`);
                var currentDate = document.createElement(`h2`);
                var weatherIcon = document.createElement(`div`);
                var currentTemp = document.createElement(`p`);
                var currentWind = document.createElement(`p`);
                var currentHumidity  = document.createElement(`p`);

                //modify
                cityName.textContent = location //?
                currentDate = //? 
                weatherIcon = data[i].weather.icon;
                currentTemp = data[i].main.temp;
                currentWind = data[i].wind.speed;
                currentHumidity = data[i].main.humidity;

                //append
                currentWeatherReport.append(cityName);
                currentWeatherReport.append(currentDate);
                currentWeatherReport.append(weatherIcon);
                currentWeatherReport.append(currentTemp);
                currentWeatherReport.append(currentWind);
                currentWeatherReport.append(currentHumidity);
            }



//Display current weather forcast 
var displayCurrentWeather = function (weather, city) {

}



// //API call for currernt weather 
// // var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api key}"

// //API call for 5 day forcast 
// var fiveDayRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api key}";
