const { userPreference } = require('./models')

module.exports = async (id, newPreference) => {

  if (!(await userPreference.findOne({ _id: id }))) {
    preference = new userPreference({
      _id: id,
      isAsked: true,
      isEnabled: newPreference,
    })
    await preference.save()
  }
  else{
    await userPreference.updateOne({ _id: id }, {"globalTracking.isEnabled": newPreference, "globalTracking.isAsked": true})
  }

}