//Importing modules
const setup = require('./modules/setup/setup.js');
const startup = require('./modules/setup/startup.js');
const {client} = require('./modules/setup/client');
require('dotenv').config();

//Debug
const debug = process.argv[2] === 'debug' ? true : false;
if(debug){
  console.log('Running in debug mode');
  client.on('debug', console.log)
  client.on('warn', console.warn);
}

//Commands setup
setup.commands.load(client);

//Events setup
setup.events.load(client);

//Startup
startup.run();

client.login(process.env.BOT_TOKEN);