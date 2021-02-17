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

  async city(place) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });

      const { data } = await instance.get();

      console.log(data);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

module.exports = Searches;
