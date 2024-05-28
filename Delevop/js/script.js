const searchBar = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchBtn');
const citiesContainer = document.querySelector('#citiesContainer');
const APIKey = "e300157fad86e64b86dd4436e9fa7a08"

let cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];

function place() {
   const locationAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
   fetch (locationAPI)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         cityNames.push(data[0].name)
         localStorage.setItem("cityNames", JSON.stringify(cityNames))
      })
};

function removeDoubles() {
   cityNames = cityNames.filter( (name, i) => !cityNames.includes(name, i + 1))
   localStorage.setItem("cityNames" , JSON.stringify(cityNames))
   console.log(cityNames)
};

function buttonMaker() {
   console.log("buttonmaker", cityNames)
   for (let i = 1; i < cityNames.length; i++) {
      // Create a new button element
const button = document.createElement("button");
button.textContent = cityNames[i];
button.id = cityNames[i];
button.classList.add("hButtons");
document.querySelector(".pastSearches").appendChild(button);
   }
};


function readLocalStorage() {
   let string = localStorage.getItem("city");
   let cityWeather = JSON.parse(string) || [];
   return cityWeather;
};

function saveToStorage(cityWeather) {
   let saveData = JSON.stringify(cityWeather);
   localStorage.setItem("city", saveData);
};

function dataPopulate() {
   const weather = readLocalStorage();
   const todayContainer = document.querySelector(".today");

   const cityName = document.createElement("h1");
   cityName.textContent = weather.city.name;
   todayContainer.appendChild(cityName);

   const today = document.createElement("div");
   today.classList.add("theBest");
   todayContainer.appendChild(today);

   const dateToday = document.createElement("p");
   dateToday.textContent = dayjs.unix(weather.list[0].dt).format("MM/DD/YYYY");
   today.appendChild(dateToday);

   const tempToday = document.createElement("p");
   tempToday.textContent = `Temp: ${weather.list[0].main.temp}`;
   today.appendChild(tempToday);

   const windToday = document.createElement("p");
   windToday.textContent = `Wind: ${weather.list[0].wind.speed} mph`;
   today.appendChild(windToday);

   const humidityToday = document.createElement("p");
   humidityToday.textContent = `Humidity: ${weather.list[0].main.humidity}%`;
   today.appendChild(humidityToday);

   // Populate forecast
   const forecastContainer = document.querySelector(".forecast");

   for (let i = 0; i < weather.list.length; i += 7) {
       const forecast = document.createElement("div");
       forecast.classList.add("theBest");
       forecastContainer.appendChild(forecast);

       const dateForecast = document.createElement("p");
       dateForecast.textContent = dayjs.unix(weather.list[i].dt + 86400).format("MM/DD/YYYY");
       forecast.appendChild(dateForecast);

       const tempForecast = document.createElement("p");
       tempForecast.textContent = `Temp: ${weather.list[i].main.temp}`;
       forecast.appendChild(tempForecast);

       const windForecast = document.createElement("p");
       windForecast.textContent = `Wind: ${weather.list[i].wind.speed} mph`;
       forecast.appendChild(windForecast);

       const humidityForecast = document.createElement("p");
       humidityForecast.textContent = `Humidity: ${weather.list[i].main.humidity}%`;
       forecast.appendChild(humidityForecast);
   }
}

// function dataPopulate() {
//    const weather = readLocalStorage()
//    const cityName = $("<h1>").text(weather.city.name).appendTo($(".today"));
//    const today = $("<div>").addClass("theBest").appendTo($(".today"));
//    const date = $("<p>").text(dayjs.unix(weather.list[0].dt).format("MM/DD/YYYY")).appendTo(today);
//    const temp = $("<p>").text(`Temp:${weather.list[0].main.temp}`).appendTo(today);
//    const wind = $("<p>").text(`Wind:${weather.list[0].wind.speed}/mph`).appendTo(today);
//    const humidity = $("<p>").text(`Humidity:${weather.list[0].main.humidity}%`).appendTo(today);
   
//    for (let i = 0; i < weather.list.length; i+=7) {
//        const forcast = $("<div>").addClass("theBest").appendTo($(".forcast"));
//        const date = $("<p>").text(dayjs.unix(weather.list[i].dt+86400).format("MM/DD/YYYY")).appendTo(forcast);
//        const temp = $("<p>").text(`Temp:${weather.list[i].main.temp}`).appendTo(forcast);
//        const wind = $("<p>").text(`Wind:${weather.list[i].wind.speed}/mph`).appendTo(forcast);
//        const humidity = $("<p>").text(`Humidity:${weather.list[i].main.humidity}%`).appendTo(forcast);
       
//    }
// };


function displayCityName(nameOfCity) {
   // Get all h2 elements on the page
   const h2Elements = document.querySelectorAll('h2');

   // Loop through each h2 element and set its text content to the nameOfCity
   h2Elements.forEach((h2) => {
       h2.textContent = nameOfCity;
   });
}

// function displayCityName(nameOfCity){
//    $('h2').text(nameOfCity)
// }

searchBar.addEventListener('click', function(e) {
  e.preventDefault();
   console.log('searchBar');
   locationPull();

   const cityName = city.value;
   console.log(cityName);
   displayCityName(cityName);
   
   document.querySelectorAll('.today').forEach(element => element.innerHTML = '');
   document.querySelectorAll('.forecast').forEach(element => element.innerHTML = '');
});

// form.on("click", ".action", function(e){
//    e.preventDefault()
//    console.log('form')
//    locationPull();
//    console.log(city.val())
//    displayCityName(city.val())
//    $('.today').empty()
//    $('.forcast').empty()
   
// });

buttonMaker();



document.querySelector(".pastSearches").addEventListener("click", function(e) {
   if (e.target.classList.contains("hButtons")) {
       e.preventDefault();
       const cityName = e.target.getAttribute("id");
       displayCityName(cityName);
       document.querySelector('.today').innerHTML = '';
       document.querySelector('.forecast').innerHTML = '';
       const locationApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIKey}`;
       
       fetch(locationApi)
           .then(response => response.json())
           .then(data => {
               // Handle the response data here
           })
           .catch(error => console.error('Error fetching location data:', error));
   }
});

// $(".pastSearches").on("click", ".hButtons", function(e){
//    e.preventDefault()
//    const cityName = $(this).attr("id");
//    displayCityName(cityName)
//    $('.today').empty()
//    $('.forcast').empty()
//    const locationApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIKey}`
//    fetch(locationApi)
//    .then(response => {
//        return response.json()
//    })
// });




// const searchBarEl = document.querySelector('#search-bar');
// const searchInputEl = document.querySelector('#search');
// const citiesContainerEl = document.querySelector('#cities-container');

// const APIKey = "565a4095f3194e3b4c76c7b9e5dfe6e9"

// const searchSubmitHandler = function (event) {
//    event.preventDefault();

//    const search = searchInputEl.value.trim();

//    if(search) {
//       getWeatherData(search);

//       citiesContainerEl.textContent = '',
//       searchInputEl.value = '';
//    } else {
//       alert('Please enter city name');
//    }
// };

// const buttonClickHandler = function (event) {
//    const city = event.target.getAttribute('city-name');

//    if (city) {
//       getFeaturedWeather(city);

//       citiesContainerEl.textContent = '';
//    }
// };

// const getWeatherData = function(user) {
//    const apiURL = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${APIkey}`

//    fetch(apiURL)
//       .then(function (response) {
//          if (response.ok) {
//             response.json().then(function (data) {
//                displayWeather(data, user);
//             });
//          } else {
//             alert(`Error:${response.statusText}`);
//          }
//       })
//       .catch(function (error) {
//          alert('Unable to get weather data');
//       });
// };


// const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`

