const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
  name: 'clearleaderboard',

  commandBuilder: new SlashCommandBuilder()
    .setName('clearleaderboard')
    .setDescription('Clears the guild\' sleaderboard')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const serverData = await vcStats.get(interaction.guild.id);

    if(!serverData) return interaction.reply({ content: 'This server does not have a leaderboard!', ephemeral: true });

    const lbLength = Object.entries(serverData).length

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('#6D67E4')
      .setTitle('Cleared successfully!')
      .setDescription(`Cleared ${new Intl.NumberFormat().format(lbLength)} entries`);

    await vcStats.delete(interaction.guild.id);

    return interaction.reply({ embeds: [embed] });
  }

}