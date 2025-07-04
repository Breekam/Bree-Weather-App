function updateWeather(response) {
  let temperatureSection = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let citySection = document.querySelector("#city");
  let descriptionSection = document.querySelector("#description");
  let humiditySection = document.querySelector("#humidity");
  let windSpeedSection = document.querySelector("#wind-speed");
  let timeSection = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconSection = document.querySelector("#icon");

  citySection.innerHTML = response.data.city;
  temperatureSection.innerHTML = Math.round(temperature);
  descriptionSection.innerHTML = response.data.condition.description;
  humiditySection.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedSection.innerHTML = `${response.data.wind.speed}km/h`;
  timeSection.innerHTML = formatDate(date);
  iconSection.innerHTML = `<img src="${response.data.condition.icon_url}"class="emoji">`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "4990fbab5088ob33c5f458fta8ad45bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "4990fbab5088ob33c5f458fta8ad45bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>

            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
    }
  });

  let forecastSection = document.querySelector("#forecast");
  forecastSection.innerHTML = forecastHtml;
}

let searchFormSection = document.querySelector("#search-form");
searchFormSection.addEventListener("submit", handleSearchSubmission);

searchCity("Paris");
displayForecast();
