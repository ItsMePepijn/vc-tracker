const updateGlobal = require('../leaderboard/updateGlobal.js');
function run(){
  updateGlobal();
  setInterval(updateGlobal, 30 * 60 * 1000);
}

module.exports = {
  run
}