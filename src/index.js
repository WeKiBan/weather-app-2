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
  draggable: true,
  // callback function to change state of navigation dots
  callback: function (index, elem, dir) {
    // remove active class from both dots
    ui.pageNavigationItems.forEach((item) => {
      item.classList.remove('active');
    });
    // apply active class to appropriate dot
    ui.pageNavigationItems[index].classList.add('active');
  },
});

// even listener for navigation dots
ui.pageNavigation.addEventListener('click', function (e) {
  // if dont has id of prev go to prev slide
  if (e.target.id === 'prev') {
    window.mySwipe.prev();
    // if next go to next slide
  } else if (e.target.id === 'next') {
    window.mySwipe.next();
  }
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

// even listener to confirm delete of location
ui.confirmDeleteBtn.addEventListener('click', function () {
  // call delete function
  storage.deleteLocation();
  // set selected id to 1
  storage.selectedLocationId = '1';
  //save
  storage.saveToLocalStorage();
  // render side menu and weather
  weather.fetchWeather().then((data) => ui.renderWeather(data));
  ui.renderSideMenu();
  // close modal
  $('#deleteLocationModal').modal('hide');
});

// if plus icon is pressed to open modal clear and text in inputs
ui.plusBtn.addEventListener('click', function () {
  // clear location input
  ui.locationInput.value = '';
  // clear location object
  locationApi.clearLocationObject();
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
  // go back top first slide
  window.mySwipe.prev();
  //close the side menu
  ui.openCloseSideMenu();
});

// Event listener for autocomplete location
locationApi.placesAutocomplete.on('change', async (e) => {
  // get url from upsplash
  const photoUrl = await background.getPhoto(e.suggestion.country);
  // create location object
  const location = {
    id: Date.now().toString(),
    name: e.suggestion.name,
    coordinates: e.suggestion.latlng,
    country: e.suggestion.country,
    url: photoUrl,
  };
  // Set location object
  locationApi.setLocationObject(location);
});

// Event Listener for add location btn in new location modal
ui.addLocationBtn.addEventListener('click', function () {
  // check if a location has been selected show alert and return
  if (!locationApi.locationObject) {
    ui.hideShowAlert();
    // set alert to disappear after 3 seconds
    setTimeout(function () {
      ui.hideShowAlert();
    }, 3000);
    return;
  }
  // if yes add location and save local storage
  storage.addLocation(locationApi.locationObject);
  storage.saveToLocalStorage();
  // set selected location id to id of new location
  storage.selectedLocationId = locationApi.locationObject.id;
  // re render the side menu to include new location
  ui.renderSideMenu();
  // fetch weather data and render it to the display
  weather.fetchWeather().then((data) => ui.renderWeather(data));
  // clear the inputs
  ui.locationInput.value = '';
  // hide modal using jquery
  $('#newLocationModal').modal('hide');
  // go back top first slide
  window.mySwipe.prev();
  // close side menu
  ui.openCloseSideMenu();
  // clear location object info
  locationApi.clearLocationObject();
});
