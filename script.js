//Geocoding API call 
var geoCoding = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={api key}"

//API call for currernt weather 
var currentRequestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api key}"

//API call for 5 day forcast 
var fiveDayRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api key}";

$.ajax({
    url: currentRequestUrl,
    method: `GET`,
}).then(function(response) {
    console.log(`AJAX Response /n-----------`);
    console.log(response);
});
