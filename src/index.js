//Importing modules
const setup = require('./modules/setup.js');
const {client} = require('./modules/client');
require('dotenv').config();

//Commands setup
setup.commands.load(client);

//Events setup
setup.events.load(client);


client.login(process.env.BOT_TOKEN);