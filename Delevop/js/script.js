const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');
const citiesContainer = document.querySelector('#citiesContainer');
const APIKey = "e300157fad86e64b86dd4436e9fa7a08"

let cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];

function location() {
   const locationAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
   fetch (locationAPI)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         cityNames.push(data[0].name)
         localStorage.setItem("cityNames", JSON.stringify(cityNames))
      })
}

function removeDoubles() {
   cityNames = cityNames.filter( (name, i) => !cityNames.includes(name, i+1))
   localStorage.setItem("cityNames" , JSON.stringify(cityNames))
   console.log(cityNames)
};

function buttonMaker() {
   console.log("buttonmaker", cityNames)
   for (let i = 1; i < cityNames.length; i++) {
   let button = $("<button>").text(cityNames[i]).attr("id", cityNames[i]).addClass("hButtons").appendTo($(".history"));
   
}
};


function readLocalStorage() {
   let string = localStorage.getItem("city");
   let cityWeather = JSON.parse(string) || [];
   return cityWeather;
}

function saveToStorage(cityWeather) {
   let saveData = JSON.stringify(cityWeather);
   localStorage.setItem("city", saveData);
}





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

