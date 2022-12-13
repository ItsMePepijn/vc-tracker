const {updateGlobal} = require('../leaderboard');
function run(){
  updateGlobal();
  setInterval(updateGlobal, 30 * 60 * 1000);
}

module.exports = {
  run
}