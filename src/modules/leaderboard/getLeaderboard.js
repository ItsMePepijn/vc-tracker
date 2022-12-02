const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const globalLeaderboard = new QuickDB({ filePath: './db/userData.sqlite', table: 'globalLeaderboard' });


module.exports = async (serverId, tab = 0) => {
  if(serverId){
    const serverData = await vcStats.get(serverId);
    if (!serverData) return null;

    const leaderboardData = await Object.entries(serverData).sort((a, b) => b[1].time - a[1].time);
    return leaderboardData;
  }
  else{
    const leaderboardData = await globalLeaderboard.get('leaderboard');
    if (!leaderboardData) return null;

    leaderboardData.slice(tab * 10, (tab * 10) + 10);
    return leaderboardData;
  }
}
