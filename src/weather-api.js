// module imports
import { storage } from './storage.js';

class Weather {
  constructor() {
    this.weatherApiToken = '2e44188ae7e877bf4fe23dac83d52bae';
  }
  async fetchWeather() {
    const location = storage.findSelectedLocation();
    const coordinates = location.coordinates;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude={part}&appid=${this.weatherApiToken}`
    );
    const responseData = await response.json();

    return responseData;
  }
}

export const weather = new Weather();
