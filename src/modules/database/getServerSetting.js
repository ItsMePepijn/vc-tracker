const { serverSetting } = require('./models')

module.exports = async (id) => {
  let settings = await serverSetting.findOne({ _id: id })

  if (!settings) {
    settings = new serverSetting({ _id: id })
    await settings.save()
  }

  return settings
}