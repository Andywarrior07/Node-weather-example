const axios = require('axios');

class Searches {
  record = [];

  constructor() {}

  async city(place) {
    try {
      const { data } = await axios.get('https://reqres.in/api/users?page=2');
      console.log(data);
    } catch (err) {
      return [];
    }
  }
}

module.exports = Searches;
