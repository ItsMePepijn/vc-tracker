const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = async (newState) => {
  const embed = new EmbedBuilder()
    .setTitle('Voice Channel Tracking')
    .setDescription('Do you want your vc time to be tracked for the global leaderboard?\n*This will only track your time in servers I am in*\n\n**You can change this at any time with `/globaltracking`**')
    .setColor('#2f3136')
    .setTimestamp();

  const actionRow = new ActionRowBuilder()
    .addComponents([
      new ButtonBuilder()
        .setLabel("Yes!")
        .setCustomId("enableGlobalTracking")
        .setStyle(3),
      new ButtonBuilder()
        .setLabel("No")
        .setCustomId("disableGlobalTracking")
        .setStyle(4)
    ])
  
  const user = await newState.guild.members.fetch(newState.id)
  user.send({ embeds: [embed], components: [actionRow] }).catch(() => {});
}
