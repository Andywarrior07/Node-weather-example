const Searches = require('./models/searches');
const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');

const main = async () => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const place = await readInput('Ciudad: ');

        await searches.city(place);

        console.log('\nInformacion de la ciudad\n'.green);
        console.log(`Ciudad: `);
        console.log(`Lat: `);
        console.log(`Lng: `);
        console.log(`Temperatura: `);
        console.log(`Minima:`);
        console.log(`Maxima: `);
        break;

      case 2:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
