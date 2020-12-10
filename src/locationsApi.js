class Places {
  constructor() {
    this.locationObject;
    this.placesAutocomplete = places({
      appId: 'plY0MA3QXGNO',
      apiKey: 'b1739edb24aa543c66a07bbf67e452bb',
      container: document.querySelector('#location-input'),
    });
  }
  setLocationObject(location){
    this.locationObject = location;
  }
  clearLocationObject(){
    this.locationObject = '';
  }
}

export const locationApi = new Places();


