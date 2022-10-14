var currentWeatherReport = document.querySelector(`#current-weather-report`);
var fiveDayreport = document.querySelector(`#five-day-report`);
var cityState = document.querySelector("#city-state");
var searchButton = document.querySelector("#search")

//Search for city and state 
var searchLocation = function (event) {
    event.preventdefault();

    var location = cityState.value();

    if (location) {
        getCurrentWeather(location);

        currentWeatherReport.textContent = ` `;
    } else {
        alert(`Please enter a valid city and state.`);
    }
};

//Event listener for search button 
searchButton.addEventListener(`click`, () => {
    getCurrentWeather();
    getFiveDayWeather();
});

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




// //Geocoding API call - do this call first 
// var geoCoding = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={api key}"

// //API call for currernt weather 
// // var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api key}"

// //API call for 5 day forcast 
// var fiveDayRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api key}";
