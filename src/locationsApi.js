class Location {
  constructor() {
    this.locationObject;
    this.placesAutocomplete = places({
      appId: process.env.APP_ID,
      apiKey: process.env.LOCATIONS_API_KEY,
      container: document.querySelector('#location-input'),
    });
  }
  setLocationObject(location) {
    this.locationObject = location;
  }
  clearLocationObject() {
    this.locationObject = '';
  }
}

export const locationApi = new Location();
