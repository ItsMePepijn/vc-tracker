const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getServer = require('../../modules/getServer.js');

module.exports = {
  name: 'leaderboard',

  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Shows the vc leaderboard of the server'),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle('Leaderboard')
      .setColor('#FF0000')
      .setTitle(`${interaction.guild.name}'s leaderboard!`);

    const leaderboardData = await getServer(interaction.guild.id);
    if (!leaderboardData) return interaction.reply('There is no leaderboard for this server yet!');

    for(let i = 0; i <= 9; i++){
      let position;
      switch(i){
        case 0:
          position = `🥇 #${i + 1}`;
          break;
        case 1:
          position = `🥈 #${i + 1}`;
          break;
        case 2:
          position = `🥉 #${i + 1}`;
          break;
        default:
          position = `#${i + 1}`;
          break;
      }
      if(!leaderboardData[i]) break;
      embed.addFields({ name: position, value: `<@${leaderboardData[i][0]}> **-** ${leaderboardData[i][1].time}` });
    }

    return interaction.reply({ embeds: [embed] });
  }
}