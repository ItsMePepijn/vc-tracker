const voiceModules = require('../modules/voice');
const { getPreference, setPreference} = require('../modules/database');


module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    
    const userPreference = await getPreference(newState.id);
    if(!userPreference.globalTracking.isEnabled && !userPreference.globalTracking.asked){
      voiceModules.askPermission(newState);
      await setPreference(newState.id, false);
    }

    voiceModules.userUpdate(oldState, newState);
  }
}