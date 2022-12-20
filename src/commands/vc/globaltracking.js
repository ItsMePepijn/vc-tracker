const { setPreference } = require('../../modules/database');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'globaltracking',

  commandBuilder: new SlashCommandBuilder()
    .setName('globaltracking')
    .setDescription('Changes if you are displayed on the global leaderboard')
    .addBooleanOption(option =>
      option.setName('value').setDescription('The value to set the option to').setRequired(true)
    ),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle("Changed successfully!")
      .setColor("#43b581");

    if(interaction.options.getBoolean('value')) embed.setDescription('You are now displayed on the global leaderboard');
    else embed.setDescription('You won\'t be displayed on the global leaderboard after the next refresh');

    await setPreference(interaction.user.id, interaction.options.getBoolean('value'));

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}