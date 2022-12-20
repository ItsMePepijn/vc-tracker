const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const { getServerSetting } = require('../database');

module.exports = async (oldState, newState) => {
  if(!await vcStats.get(`${newState.guild.id}.${newState.id}`)) await vcStats.set(`${newState.guild.id}.${newState.id}`, { time: 0, lastJoin: 0 });

  const { shouldBeUnmuted, shouldBeUndeafened } = await getServerSetting(newState.guild.id);

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
