const updateGlobal = require('./updateGlobal.js');
function run(){
  setInterval(updateGlobal(), 1_800_000);
}

module.exports = {
  run
}