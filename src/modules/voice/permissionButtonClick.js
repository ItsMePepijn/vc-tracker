const { EmbedBuilder } = require('discord.js');
const { setPreference } = require('../database');

module.exports = async (interaction) => {
  const embed = new EmbedBuilder()
    .setTitle('Voice Channel Tracking')
    .setTimestamp();

  if(interaction.customId === 'enableGlobalTracking') {
    await setPreference(interaction.user.id, true);

    embed.setDescription('Global leaderboard tracking has been enabled!\n*This will only track your time in servers I am in*')
      .setColor('#43b581');

    return interaction.message.edit({ embeds: [embed], components: [] });
  }

  if(interaction.customId === 'disableGlobalTracking') {
    await setPreference(interaction.user.id, false);

    embed.setDescription('Global leaderboard tracking will not be turned on\nYou can turn this on at any time with `/globaltracking`')
      .setColor('#f04747');
      
    return interaction.message.edit({ embeds: [embed], components: [] });
  }
}
