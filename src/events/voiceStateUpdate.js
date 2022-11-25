const voiceModules = require('../modules/voice.js');

module.exports = {
  name: 'voiceStateUpdate',
  execute(oldState, newState, client) {
    voiceModules.userUpdate(oldState, newState);
    
  }
}