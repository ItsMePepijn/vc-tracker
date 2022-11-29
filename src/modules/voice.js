const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const serverData = new QuickDB({ filePath: './db/userData.sqlite', table: 'serverData' });
const userPreferences = new QuickDB({ filePath: './db/userPreferences.sqlite', table: 'userPreferences' });
const Discord = require('discord.js');

async function userUpdate(oldState, newState) {
  if(!await serverData.get(newState.guild.id)) await serverData.set(newState.guild.id, { shouldBeUnmuted: true, shouldBeUndeafened: true });
  if(!await vcStats.get(`${newState.guild.id}.${newState.id}`)) await vcStats.set(`${newState.guild.id}.${newState.id}`, { time: 0, lastJoin: 0 });

  const {shouldBeUnmuted} = await serverData.get(newState.guild.id);
  const {shouldBeUndeafened} = await serverData.get(newState.guild.id);

  let isEligeble = true;
  if(shouldBeUnmuted && (newState.selfMute || newState.serverMute)) isEligeble = false;
  if(shouldBeUndeafened && (newState.selfDeaf || newState.serverDeaf)) isEligeble = false;
  

  if(newState.channelId && isEligeble) {
    if(oldState.channelId) {
      const {lastJoin} = await vcStats.get(`${newState.guild.id}.${newState.id}`);
      if(lastJoin) {
        const time = Date.now() - lastJoin;
        await vcStats.add(`${newState.guild.id}.${newState.id}.time`, time);
      }
    }
    return await vcStats.set(`${newState.guild.id}.${newState.id}.lastJoin`, Date.now());
  }

  if(!newState.channelId || (newState.channelId && !isEligeble)) {
    const {lastJoin} = await vcStats.get(`${newState.guild.id}.${newState.id}`);
    if(lastJoin) {
      const time = Date.now() - lastJoin;
      await vcStats.add(`${newState.guild.id}.${newState.id}.time`, time);
    } 
    return await vcStats.set(`${newState.guild.id}.${newState.id}.lastJoin`, 0);
  }
}

async function getPermission(newState) {
  const embed = new Discord.EmbedBuilder()
    .setTitle('Voice Channel Tracking')
    .setDescription('Do you want your vc time to be tracked for the global leaderboard?\n*This will only track your time in servers I am in*\n\n**You can change this at any time with `/globaltracking`**')
    .setColor('#FF0000')
    .setTimestamp();

  const actionRow = new Discord.ActionRowBuilder()
    .addComponents([
      new Discord.ButtonBuilder()
        .setLabel("Yes!")
        .setCustomId("enableGlobalTracking")
        .setStyle(3),
      new Discord.ButtonBuilder()
        .setLabel("No")
        .setCustomId("disableGlobalTracking")
        .setStyle(4)
    ])
  
  const user = await newState.guild.members.fetch(newState.id)
  const message = user.send({ embeds: [embed], components: [actionRow] });
}
module.exports = {
  userUpdate,
  getPermission
}