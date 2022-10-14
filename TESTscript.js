var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=d97fe2285b7bc123de0716fce9e4ac7a";

fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
  //Loop over the data to generate a table, each table row will have a link to the repo url
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
});