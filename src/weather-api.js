import { storage } from './storage.js';

class Weather {
  constructor() {
    this.weatherApiToken = process.env.WEATHER_API;
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
