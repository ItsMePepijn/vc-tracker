const { userPreference } = require('./models')

module.exports = async (id) => {
  let preference = await userPreference.findOne({ _id: id })

  if (!preference) {
    preference = new userPreference({ _id: id })
    await preference.save()
  }

  return preference
}