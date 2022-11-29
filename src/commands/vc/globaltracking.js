const { QuickDB } = require('quick.db');
const userPreferences = new QuickDB({ filePath: './db/userPreferences.sqlite', table: 'userPreferences' });
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'globaltracking',

  data: new SlashCommandBuilder()
    .setName('globaltracking')
    .setDescription('Changes if you are displayed on the global leaderboard')
    .addBooleanOption(option =>
      option.setName('value').setDescription('The value to set the option to').setRequired(true)
    ),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle("Changed successfully!")
      .setColor("#43b581")

    if(interaction.options.getBoolean('value')){
      embed.setDescription('You are now displayed on the global leaderboard');
    } else {
      embed.setDescription('You won\'t be displayed on the global leaderboard');
    }

    await userPreferences.set(`${interaction.user.id}.globalTracking.isEnabled`, interaction.options.getBoolean('value'));
    await userPreferences.set(`${interaction.user.id}.globalTracking.asked`, true);

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}