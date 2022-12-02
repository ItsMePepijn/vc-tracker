const { QuickDB } = require('quick.db');
const vcStats = new QuickDB({ filePath: './db/userData.sqlite', table: 'vcStats' });
const leaderboardDatabase = new QuickDB({ filePath: './db/userData.sqlite', table: 'globalLeaderboard' });

module.exports = async () => {
  const all = await vcStats.all()
  let leaderboard = []

  await all.forEach(server => {
    Object.entries(server.value).forEach(user => {
      console.log(user)
      leaderboard.push({id: user[0], time: user[1].time})
    })
  })

  console.log(leaderboard)

  await leaderboard.sort((a, b) => b.time - a.time);
  if(leaderboard.length > 99) leaderboard = leaderboard.slice(0, 99);
  await leaderboardDatabase.set('leaderboard', leaderboard);
}
