const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });

module.exports = async (serverId) => {
  const serverData = await vcStats.get(serverId);
  if (!serverData) return null;

  const leaderboardData = await Object.entries(serverData).sort((a, b) => b[1].time - a[1].time);
  return leaderboardData;
}
