const Discord = require('discord.js')

const Intents = Discord.GatewayIntentBits
const Partials = Discord.Partials
exports.client = new Discord.Client({ intents: [
  Intents.Guilds, 
  Intents.GuildMembers,
  Intents.GuildVoiceStates,
], 
partials: [Partials.Message, Partials.Channel, Partials.Reaction] });