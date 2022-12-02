//Importing modules
const setup = require('./modules/setup/setup.js');
const startup = require('./modules/setup/startup.js');
const {client} = require('./modules/setup/client');
require('dotenv').config();

//Commands setup
setup.commands.load(client);

//Events setup
setup.events.load(client);

//Startup
startup.run();


client.login(process.env.BOT_TOKEN);