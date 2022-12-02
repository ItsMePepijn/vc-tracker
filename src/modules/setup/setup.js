const fs = require('fs');
const chalk = require('chalk');
const Discord = require('discord.js');

let commands = {
  load: function (client) {
    client.commands = new Discord.Collection();

    const commandFolders = fs.readdirSync('./src/commands').filter(folder => fs.lstatSync(`./src/commands/${folder}`).isDirectory());
    for (const folder of commandFolders) {

      const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.name, command);

        if(command.isDisabled) console.log(chalk.redBright('[COMMAND LOADER]') + ` - ${chalk.blue(chalk.bold(file))} from ${chalk.blue(chalk.bold(folder))} has been loaded but its disabled!`);
        else console.log(chalk.green('[COMMAND LOADER]') + ` - ${chalk.blue(chalk.bold(file))} from ${chalk.blue(chalk.bold(folder))} has been loaded`);
      }
    }

    console.log(' ');
  },
}

let events = {
  load: function (client) {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
      const event = require(`../events/${file}`);
      console.log(chalk.green('[EVENT LOADER]') + ` - ${file} has been loaded`);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }

    console.log(' ');
  }
}

module.exports = {
  commands,
  events
};