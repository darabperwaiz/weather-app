// Variables
const apiKey = "46d81811614bb3c67cdfe7364ed7801d";
const weatherData = document.querySelector("#weather-data");
const cityValue = document.getElementById("location-input");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const cityName = document.querySelector(".cityName");
const countryCode = document.querySelector(".country");

// -----------------------------------------Variable End-------------------------------------------

const timeStampConvert = (timeStamp) => {
  let dateobj = new Date(timeStamp*1000);
  const h = dateobj.getHours()
  const m  = (dateobj.getMinutes() < 10 ? "0" : "") + dateobj.getMinutes();
  const totalTime = (h % 12 || 12) + ":" + m + " "+ (h < 12 ? "AM" : "PM")
  return totalTime
}

// Current Day in Name
let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
][new Date().getDay()];

// Current Day in Number
let day = new Date().toDateString().slice(8, 10);

// Current Month in Name
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][new Date().getMonth()];

// Merge
date.innerHTML = `${dayName},   &nbsp${day} ${month}`;

// Current time and convert to 12h with AM/PM
function timeNow() {
  var d = new Date(),
    h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
    m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  const totalTime = (h % 12 || 12) + ":" + m + " " + (h < 12 ? "AM" : "PM");
  time.innerHTML = totalTime;
  return totalTime;
}
timeNow();

setInterval(function () {
  currentTime = timeNow();
  time.innerHTML = currentTime;
}, 1000);

// --------------------------------------------Date & Time End-------------------------------------------------------

window.onload = getWeather;
document.getElementById("location-form").addEventListener("submit", getWeather);

function getWeather(e) {
  // Stop submit default behavior
  e.preventDefault();

  // get value from input field
  let city = cityValue.value;

  // Weather API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // After submit empty input field
  cityValue.value = "";

  // Fetch Data
  fetch(url)
    .then((res) => res.json())

    // If City Valid
    .then((data) => {
      console.log(data);
      cityName.textContent = `${data.name},`;
      countryCode.textContent = data.sys.country;

      weatherData.innerHTML = `
    <div class="temp-info">
    <p class="temperature">${Math.round(data.main.temp)}°</p>
    <span class="weather-info">${data.weather[0].main}</span>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }@2x.png" alt="">
  </div>
  <div class="other-info">
    <div class="feels-like">
      <i class="fa-solid fa-snowflake"></i>
      <span class="middle">${Math.round(data.main.feels_like)}</span>
      <span class="bottom">Feels Like</span>
    </div>
    <div class="humidity">
      <i class="fa-solid fa-droplet"></i>
      <span class="middle">${data.main.humidity}%</span>
      <span class="bottom">Humidity</span>
    </div>
    <div class="wind">
      <i class="fa-solid fa-wind"></i>
      <span class="middle">${Math.round(data.wind.speed * 3.6)} km/h</span>
      <span class="bottom">Wind speed</span>
    </div>
  </div>
  <div class="sun-info">
  <div class="sunrise">
    <span class="sun-time">${timeStampConvert(data.sys.sunrise)}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-sunrise" viewBox="0 0 16 16">
      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
    </svg>
    <span class="sun-title">Sunrise</span>
  </div>
  <div class="sunset">
    <span class="sun-time">${timeStampConvert(data.sys.sunset)}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-sunset" viewBox="0 0 16 16">
      <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
    </svg>
    <span class="sun-title">Sunset</span>
  </div>
</div>
<span class="alert">*Sunrise & Sunset Time shows according to INDIAN Timezone</span>
    `;
    })
    .catch(() => {
      weatherData.innerHTML = `<p>Error: City not found</p>`;
    });
}

document.getElementById("location-form").addEventListener("load", getWeather);
