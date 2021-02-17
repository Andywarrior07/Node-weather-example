require('dotenv').config();

const Searches = require('./models/searches');
const {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} = require('./helpers/inquirer');

const main = async () => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const place = await readInput('Ciudad: ');

        const places = await searches.searchCity(place);

        const selectedId = await listPlaces(places);
        const { name, lat, lng } = places.find(
          place => place.id === selectedId
        );

        const { temp, min, max, desc } = await searches.weatherCity(lat, lng);

        console.clear();
        console.log('\nInformacion de la ciudad\n'.green);
        console.log(`Ciudad: ${name.green}`);
        console.log(`Lat: ${lat.toString().green}`);
        console.log(`Lng: ${lng.toString().green}`);
        console.log(`Temperatura: ${temp.toString().green}`);
        console.log(`Minima: ${min.toString().green}`);
        console.log(`Maxima: ${max.toString().green}`);
        console.log(`Como esta el clima: ${desc.green}`);
        break;

      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
