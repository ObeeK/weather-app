// var cityName = document.querySelector
var citySearch = document.querySelector("#weather-search")
var searchButton = document.querySelector("#searchButton")
var forecast = document.querySelector("#forecast")
// var day2 = document.querySelector("#day2")
// var day3 = document.querySelector("#day3")
// var day4 = document.querySelector("#day4")
// var day5 = document.querySelector("#day5")

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
                    renderItems(oneCallData)
                    // this is where we'll display weather info on page
                    // use bootstrap button for UV index
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

var renderItems = function(data){
    // render Current Weather
    
    renderForecast(data.daily, data.timezone)
}

var renderForecast = function(dailyForecast, timeZone) {
    for(var i = 1; i < 6; i++) {
        var col = document.createElement("div")
        var card = document.createElement("div")
        var cardBody = document.createElement("div")
        var icon = document.createElement("img")
        var tempEl = document.createElement("p")
        var windEl = document.createElement("p")
        var humidityEl = document.createElement("p")
        var cardTitle = document.createElement("h5")

        col.append(card)
        card.append(cardBody)
        cardBody.append(cardTitle, icon, tempEl, windEl, humidityEl)

        col.setAttribute("class", "col-md")
        col.classList.add("fiveDayCard")
        card.setAttribute("class", "card bg-primary h-100 text-white")
        cardBody.setAttribute("class", "card-body p-2")
        cardTitle.classList.add("card-title")
        tempEl.classList.add("card-text")
        windEl.classList.add("card-text")
        humidityEl.classList.add("card-text")
        
        var currentDate = dayjs().format('MM/DD/YYYY');
        cardTitle.innerHTML = currentDate

        var temp = dailyForecast.daily.temp.day
        tempEl.innerHTML = temp;
        
        forecast.append(col)
        
    }
}
// localStorage/previously searched cities

// when previous cities are clicked, how do we search it?