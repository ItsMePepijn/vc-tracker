const { GatewayIntentBits, Partials, Client } = require('discord.js')

exports.client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates,
], 
partials: [Partials.Message, Partials.Channel, Partials.Reaction] });