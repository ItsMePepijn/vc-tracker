const { GatewayIntentBits, Partials, Client } = require('discord.js')

module.exports = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates,
], 
partials: [Partials.Message, Partials.Channel, Partials.Reaction] });