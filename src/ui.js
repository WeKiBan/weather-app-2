import { format, fromUnixTime } from 'date-fns';
import { background } from './unsplash.js';
import { utcToZonedTime } from 'date-fns-tz';
import { storage } from './storage';

class UI {
  constructor() {
    // Query Selectors
    this.hamburgerIcon = document.querySelector('.hamburger-icon');
    this.closeIcon = document.querySelector('.close-icon');
    this.mainSection = document.querySelector('.main');
    this.overlay = document.querySelector('.overlay');

    //query selectors for page navigation
    this.pageNavigationItems = Array.from(document.querySelectorAll('.page-navigation-item'));
    this.pageNavigation = document.querySelector('.page-navigation');

    // Query selectors for page one of weather display
    this.date = document.querySelector('#date');
    this.location = document.querySelector('#location');
    this.currentWeatherIcon = document.querySelector('#current-weather-icon');
    this.currentWeatherDescription = document.querySelector(
      '#current-weather-description'
    );
    this.currentTemp = document.querySelector('#current-temp');
    this.dailyWeatherRow = document.querySelector('#daily-weather-row');
    // Query selectors for page two of weather display
    this.time = document.querySelector('.time');
    this.wind = document.querySelector('#wind');
    this.humidity = document.querySelector('#humidity');
    this.pressure = document.querySelector('#pressure');
    this.visibility = document.querySelector('#visibility');
    this.sunrise = document.querySelector('#sunrise');
    this.sunset = document.querySelector('#sunset');
    this.hourlyWeatherRow = document.querySelector('#hourly-weather-row');
    // Side menu query selectors
    this.locationsContainer = document.querySelector('#locations-container');
    // New location modal selectors
    this.addLocationBtn = document.querySelector('#add-location-btn');
    this.locationInput = document.querySelector('#location-input');
  }
  // FUNCTION TO OPEN AND CLOSE SIDE MENU
  openCloseSideMenu() {
    document.body.classList.toggle('open');
  }
  // FUNCTION TO CLEAR ELEMENT
  clearElement(element) {
    element.innerHTML = '';
  }
  // FUNCTION TO HIDE AND SHOW ALERT
  hideShowAlert(element) {
    element.classList.toggle('is-invalid');
  }
  // FUNCTION TO RENDER SIDE MENU
  renderSideMenu() {
    // Clear the locations container
    this.clearElement(this.locationsContainer);
    const locations = storage.locations;
    // loop through each location and render to side menu
    locations.forEach((location) => {
      // Create button element
      const button = document.createElement('button');
      // Set button type
      button.type = 'button';
      // set location id in dataset
      button.dataset.id = location.id;
      // check if location is selected and apply appropriate classes
      if (location.id == storage.selectedLocationId) {
        button.className = 'list-group-item active text-left';
      } else {
        button.className = 'list-group-item text-left';
      }
      // Set text content to place name
      button.textContent = `${location.name}, ${location.country}`;
      // Append button
      this.locationsContainer.appendChild(button);
    });
  }

  // FUNCTION TO RENDER WEATHER TO DISPLAY
  async renderWeather(weatherData) {
    // get current location
    const location = storage.findSelectedLocation();

    // CLEAR CURRENT WEATHER ROW
    this.clearElement(this.dailyWeatherRow);
    this.clearElement(this.hourlyWeatherRow);
    // FIRST PAGE OF RENDER
    // RENDER DATE
    this.date.textContent = format(
      utcToZonedTime(
        fromUnixTime(weatherData.current.dt),
        weatherData.timeZone
      ),
      'EEEE, MMM dd'
    );
    // RENDER LOCATION
    this.location.textContent = `${location.name}, ${location.country}`;
    // SET BACKGROUND IMAGE
    // get country name of location
    const country = location.country.replace(/ /g, '_') + '_landscape';
    // set background
    this.setBackground(country);
    // RENDER ICON
    this.currentWeatherIcon.src = `./images/animated/${weatherData.current.weather[0].icon}.svg`;
    // RENDER DESCRIPTION
    this.currentWeatherDescription.textContent =
      weatherData.current.weather[0].description;
    // SET TEMPERATURE
    this.currentTemp.textContent = Math.round(
      weatherData.current.temp - 273.15
    );
    // RENDER DAILY WEATHER VALUES
    for (var i = 1; i < 7; i++) {
      // set required data from object into variables
      const weatherInfo = weatherData.daily[i];
      const day = format(
        utcToZonedTime(fromUnixTime(weatherInfo.dt), weatherData.timeZone),
        'EEE'
      );
      const maxTemp = Math.round(weatherInfo.temp.max - 273.15);
      const minTemp = Math.round(weatherInfo.temp.min - 273.15);
      const icon = weatherInfo.weather[0].icon;
      // create div
      const div = document.createElement('div');
      // add required classes
      div.className = 'daily-weather-item';
      // inner html for element using data from weather object
      const html = `
      <img class="img-fluid" src="./images/static/${icon}.svg">
      <p>${day}</p>
      <p>${maxTemp}&#8451;</p>
      <p class="text-muted">${minTemp}&#8451;</p>
      `;
      // set inner html
      div.innerHTML = html;
      // append the new element
      this.dailyWeatherRow.appendChild(div);
    }

    // SECOND PAGE OF RENDER
    // set time 
    this.time.textContent = format(
      utcToZonedTime(
        fromUnixTime(weatherData.current.dt),
        weatherData.timezone
      ),
      'p'
    );
    // set various values in display
    this.wind.textContent = weatherData.current.wind_speed;
    this.humidity.textContent = weatherData.current.humidity;
    this.pressure.textContent = weatherData.current.pressure;
    this.visibility.textContent = weatherData.current.visibility;
    this.sunrise.textContent = format(
      utcToZonedTime(
        fromUnixTime(weatherData.current.sunrise),
        weatherData.timezone
      ),
      'p'
    );
    this.sunset.textContent = format(
      utcToZonedTime(
        fromUnixTime(weatherData.current.sunset),
        weatherData.timezone
      ),
      'p'
    );
    // FOR LOOP TO RENDER HOURLY WEATHER
    for (var i = 0; i < 6; i++) {
      // set required data from object into variables
      const weatherInfo = weatherData.hourly[i];
      let hour;
      // If first weather item set time as now else set appropriate hour
      if (i === 0) {
        hour = 'Now';
      } else {
        hour = format(
          utcToZonedTime(fromUnixTime(weatherInfo.dt), weatherData.timezone),
          'kk:mm'
        );
      }
      // temp
      const temp = Math.round(weatherInfo.temp - 273.15);
      // weather icon
      const icon = weatherInfo.weather[0].icon;
      // create div
      const div = document.createElement('div');
      // add required classes
      div.className = 'daily-weather-item';
      // inner html for element using data from weather object
      const html = `
      <img class="img-fluid" src="./images/static/${icon}.svg">
      <p>${hour}</p>
      <p>${temp}&#8451;</p>
      `;
      // set inner html
      div.innerHTML = html;
      // append the new element
      this.hourlyWeatherRow.appendChild(div);
    }
  }
  async setBackground(country) {
    // get url from upsplash
    const response = await background.getPhoto(country);
    const url = response.response.results[0].urls.regular;
    // set background url
    this.mainSection.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
     url(${url})`;
  }
}

export const ui = new UI();
