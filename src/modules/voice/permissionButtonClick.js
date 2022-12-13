const { QuickDB } = require('quick.db');
const userPreferences = new QuickDB({ filePath: './db/userPreferences.sqlite', table: 'userPreferences' });
const { EmbedBuilder } = require('discord.js');

module.exports = async (interaction) => {
  const embed = new EmbedBuilder()
    .setTitle('Voice Channel Tracking')
    .setTimestamp();

  if(interaction.customId === 'enableGlobalTracking') {
    await userPreferences.set(`${interaction.user.id}.globalTracking.isEnabled`, true);
    embed.setDescription('Global leaderboard tracking has been enabled!\n*This will only track your time in servers I am in*')
      .setColor('#43b581');
    return interaction.message.edit({ embeds: [embed], components: [] });
  }

  if(interaction.customId === 'disableGlobalTracking') {
    await userPreferences.set(`${interaction.user.id}.globalTracking.isEnabled`, false);
    embed.setDescription('Global leaderboard tracking will not be turned on\nYou can turn this on at any time with `/globaltracking`')
      .setColor('#f04747');
    return interaction.message.edit({ embeds: [embed], components: [] });
  }
}
