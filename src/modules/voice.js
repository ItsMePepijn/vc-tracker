const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const serverData = new QuickDB({ filePath: './db/userData.sqlite', table: 'serverData' });

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

module.exports = {
  userUpdate
}