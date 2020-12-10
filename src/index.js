// Module Imports
import './scss/main.scss';
import './scss/side-menu.scss';
import './scss/swipe.scss';
import Swipe from 'swipejs';
import { background } from './unsplash.js';
import { weather } from './weather-api.js';
import { locationApi } from './locationsApi';
import { ui } from './ui.js';
import { storage } from './storage.js';

// ON PAGE LOAD RENDER render initial weather
document.addEventListener('DOMContentLoaded', async function () {
  ui.renderSideMenu();
  weather.fetchWeather().then((data) => ui.renderWeather(data));
});

// swipe for wiping between pages
window.mySwipe = new Swipe(document.getElementById('slider'), {
  startSlide: 0,
  continuous: false,
});

// event listener to open and close side menu
ui.hamburgerIcon.addEventListener('click', function () {
  ui.openCloseSideMenu();
});

// event listener to close side menu
ui.closeIcon.addEventListener('click', function () {
  ui.openCloseSideMenu();
});

// if side menu is open and overlay is clicked close menu
ui.overlay.addEventListener('click', function () {
  ui.openCloseSideMenu();
});

// event listener for location list in side menu
ui.locationsContainer.addEventListener('click', function (e) {
  // check clicked target was a location item
  if (e.target.classList.contains('list-group-item')) {
    // get id of location from dataset
    const locationId = e.target.dataset.id;
    // set selected location id
    storage.selectedLocationId = locationId;
    // render the side menu
    ui.renderSideMenu();
    // save to local storage
    storage.saveToLocalStorage();
    // render the display
    weather.fetchWeather().then((data) => ui.renderWeather(data));
  }
  //close the side menu
  ui.openCloseSideMenu();
});

// Event listener for autocomplete location
locationApi.placesAutocomplete.on('change', (e) => {
  const location = {
    id: Date.now().toString(),
    name: e.suggestion.name,
    coordinates: e.suggestion.latlng,
    country: e.suggestion.country,
  };
  locationApi.locationObject = location;
});

// Event Listener for add location btn in new location modal
ui.addLocationBtn.addEventListener('click', function () {
  if (!locationApi.locationObject) {
    console.log('empty');
    return;
  }
  storage.addLocation(locationApi.locationObject);
  storage.selectedLocationId = locationApi.locationObject.id;
  storage.saveToLocalStorage();
  ui.renderSideMenu();
  weather.fetchWeather().then((data) => ui.renderWeather(data));
  ui.locationInput.value = '';
  $('#newLocationModal').modal('hide');
  ui.openCloseSideMenu();
});
