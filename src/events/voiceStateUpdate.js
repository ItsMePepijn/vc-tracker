const voiceModules = require('../modules/voice');
const { QuickDB } = require('quick.db');
const userPreferences = new QuickDB({ filePath: './db/userPreferences.sqlite', table: 'userPreferences' });


module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    const userPreference = await userPreferences.get(newState.id);
    if(!userPreference || (!userPreference.globalTracking.isEnabled && !userPreference.globalTracking.asked)){
      voiceModules.getPermission(newState);
      await userPreferences.set(`${newState.id}.globalTracking.asked`, true);
    }

    voiceModules.userUpdate(oldState, newState);
  }
}