// var cityName = document.querySelector
var citySearch = document.querySelector("#weather-search")
var searchButton = document.querySelector("#searchButton")
console.log(citySearch);
// Call current weather API for lat/lon
var weatherFunction = function (cityName) {
    var currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6b0fd80c9b010dcae0fa3214c8f86510&units=imperial`
    fetch(currentWeatherApiUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log({ data });
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            var oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=6b0fd80c9b010dcae0fa3214c8f86510&units=imperial`
            fetch(oneCallApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (oneCallData) {
                    console.log({ oneCallData })
                    // this is where we'll display weather info on page
                })

        })
        .catch(function(error) {
            console.log("Could not find city", cityName)
        })
};

// capture user input when search button is clicked

searchButton.addEventListener("click", function(event) {
console.log(citySearch.value);
var cityName = citySearch.value;
weatherFunction(cityName);
})

// localStorage/previously searched cities

// when previous cities are clicked, how do we search it?