const axios = require('axios');

class Searches {
  record = [];

  constructor() {}

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async searchCity(place) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });

      const { data } = await instance.get();

      return data.features.map(feature => ({
        id: feature.id,
        name: feature.place_name,
        lng: feature.center[0],
        lat: feature.center[1],
      }));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async weatherCity(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const { data } = await instance.get();
      const { weather, main } = data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Searches;
