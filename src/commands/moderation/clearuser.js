const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
  name: 'clearuser',

  commandBuilder: new SlashCommandBuilder()
    .setName('clearuser')
    .setDescription('Removes a user from the leaderboard')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName('user').setDescription('The user to remove').setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const userData = await vcStats.get(`${interaction.guild.id}.${user.id}`);

    if(!userData) return interaction.reply({ content: 'This user is not on the leaderboard!', ephemeral: true });

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('#FF0000')
      .setTitle('Cleared successfully!')
      .setDescription(`Cleared ${user.username} from the leaderboard`);

    await vcStats.delete(`${interaction.guild.id}.${user.id}`);

    return interaction.reply({ embeds: [embed] });
  }

}