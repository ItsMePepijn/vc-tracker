const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const globalLeaderboard = new QuickDB({ filePath: './db/userData.sqlite', table: 'globalLeaderboard' });


module.exports = async ({serverId, tab = 0} = {serverId: undefined, tab: 0}) => {
  let leaderboardData
  if(serverId){
    const serverData = await vcStats.get(serverId);
    if (!serverData) return {error: 'There is no leaderboard for this server.'};

    leaderboardData = await Object.entries(serverData).sort((a, b) => b[1].time - a[1].time);
  }
  else{
    leaderboardData = await globalLeaderboard.get('leaderboard');

    if (!leaderboardData[0]) return {error: 'There is no global leaderboard yet, you can be the first on it!'};
  }
  if(!leaderboardData[tab * 10]) return {error: 'This page does not exist!'};

  
  leaderboardData = leaderboardData.slice(tab * 10, (tab * 10) + 10)
  leaderboardData.map((data, index) => {
    user = {
      id: (data[0] || data.id),
      time: (data[1]) ? data[1].time : data.time
    }
    leaderboardData[index] = user;
  })
  return leaderboardData;
}
