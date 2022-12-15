//Importing modules
const setup = require('./modules/setup');
require('dotenv').config();

//Debug
const debug = process.argv[2] === 'debug' ? true : false;
if(debug){
  console.log('Running in debug mode');
  setup.client.on('debug', console.log)
  setup.client.on('warn', console.warn);
}

//Commands setup
setup.loadCommands(setup.client);

//Events setup
setup.loadEvents(setup.client);

setup.client.login(process.env.BOT_TOKEN);