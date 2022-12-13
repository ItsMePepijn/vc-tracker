const { Collection } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

module.exports = async (client) => {
  client.commands = new Collection();

  const commandFolders = fs.readdirSync('./src/commands').filter(folder => fs.lstatSync(`./src/commands/${folder}`).isDirectory());
  for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../../commands/${folder}/${file}`);
      client.commands.set(command.name, command);

      if(command.isDisabled) console.log(chalk.redBright('[COMMAND LOADER]') + ` - ${chalk.blue(chalk.bold(file))} from ${chalk.blue(chalk.bold(folder))} has been loaded but its disabled!`);
      else console.log(chalk.green('[COMMAND LOADER]') + ` - ${chalk.blue(chalk.bold(file))} from ${chalk.blue(chalk.bold(folder))} has been loaded`);
    }
  }

  console.log(' ');
}