const searchBar = document.querySelector('.searchBar');
const button = document.querySelector('.searchBtn');
const citiesContainer = document.querySelector('#citiesContainer');
const APIKey = "e300157fad86e64b86dd4436e9fa7a08"

let cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];

function locationPull() {
   const locationAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${citiesContainer.value}&appid=${APIKey}&units=imperial`
   console.log(locationAPI)
   fetch (locationAPI)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         removeDoubles()
         cityNames.push(data.city.name)
         localStorage.setItem("cityNames", JSON.stringify(cityNames))
         saveToStorage(data)
         dataPopulate();
         buttonMaker();
      })
};

function removeDoubles() {
   cityNames = cityNames.filter( (name, i) => !cityNames.includes(name, i + 1))
   localStorage.setItem("cityNames" , JSON.stringify(cityNames))
   console.log(cityNames)
};

function buttonMaker() {
   console.log("buttonmaker", cityNames)
   removeDoubles()
   for (let i = 1; i < cityNames.length; i++) {
     
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

   for (let i = 0; i < weather.list.length; i += 8) {
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



function displayCityName(nameOfCity) {
   const h2El = document.querySelectorAll('h2');
   h2El.forEach((h2) => {
       h2.textContent = nameOfCity;
   });
}


document.querySelector(".searchBtn").addEventListener('click', function(e) {
  e.preventDefault();
   console.log('searchBtn');
   

   const cities = citiesContainer.value;
   console.log(cities);
   displayCityName(cities);
   removeDoubles()
   document.querySelectorAll('.today').forEach(element => element.innerHTML = "");
   document.querySelectorAll('.forecast').forEach(element => element.innerHTML="");
   document.querySelectorAll('.pastSearches').forEach(element => element.innerHTML="");
   locationPull();
});






document.querySelector(".pastSearches").addEventListener("click", function(e) {
   if (e.target.classList.contains("hButtons")) {
       e.preventDefault();
       const cityName = e.target.getAttribute("id");
       displayCityName(cityName);
       document.querySelector('.today').innerHTML = '';
       document.querySelector('.forecast').innerHTML = '';
       const locationApi = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
       
       fetch(locationApi)
           .then(response => response.json())
           .then(data => {
           localStorage.setItem("city", JSON.stringify(data))
           dataPopulate();
           })
           .catch(error => console.error('Error fetching location data:', error));
   }
});

