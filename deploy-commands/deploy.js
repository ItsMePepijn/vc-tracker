const { REST, Routes } = require('discord.js');
const { clientId, devServerId } = require('./deploymentConfig.json');
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config();

const commands = [];

const commandFolders = fs.readdirSync('./src/commands').filter(folder => fs.lstatSync(`./src/commands/${folder}`).isDirectory());
for (const folder of commandFolders) {

  const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`../src/commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log(chalk.yellow(`Started refreshing ${commands.length} application (/) commands.`));

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, devServerId),
			{ body: commands },
		);

		console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands.`));
	} catch (error) {
		console.error(error);
	}
})();