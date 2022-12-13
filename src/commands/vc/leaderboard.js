const { SlashCommandBuilder, EmbedBuilder, SlashCommandSubcommandBuilder } = require('discord.js');
const ms = require('ms');
const {getLeaderboard} = require('../../modules/leaderboard');

module.exports = {
  name: 'leaderboard',

  commandBuilder: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDMPermission(false)
    .setDescription('Shows the vc leaderboard of the server')
    .addSubcommand(new SlashCommandSubcommandBuilder()
      .setName('global')
      .setDescription('Shows the global leaderboard')
      .addIntegerOption(option =>
        option.setName('page').setDescription('The page of the leaderboard to show').setRequired(false)
      )
    ),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('#FF0000')

    let leaderboardData
    if(interaction.options._subcommand === 'global'){
      embed.setTitle('Global Leaderboard!')

      const page = interaction.options.getInteger('page') || 0;

      leaderboardData = await getLeaderboard({tab: page});
      if (leaderboardData.error) return interaction.reply(leaderboardData.error);
    }
    else{
      embed.setTitle(`${interaction.guild.name}'s leaderboard!`);

      leaderboardData = await getLeaderboard({serverId: interaction.guild.id});
      if (leaderboardData.error) return interaction.reply(leaderboardData.error);
    }

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
      const userData = {
        id: (leaderboardData[i][0] || leaderboardData[i].id),
        time: (leaderboardData[i][1]) ? leaderboardData[i][1].time : leaderboardData[i].time
      }
      await interaction.client.users.fetch(userData.id).then(user => {
        embed.addFields({ name: position, value: `${user.tag} **-** ${ms(userData.time)}` });
      })
    }

    return interaction.reply({ embeds: [embed] });
  }
}