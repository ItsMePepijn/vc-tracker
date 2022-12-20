const { serverSetting } = require('./models')

module.exports = async (id, toBeChanged, change) => {

  if (!(await serverSetting.findOne({ _id: id }))) {
    setting = new serverSetting({
      _id: id,
      shouldBeUnmuted: (toBeChanged === 'shouldBeUnmuted') ? change : true,
      shouldBeUndeafened: (toBeChanged === 'shouldBeUndeafened') ? change : true,
    })
    await setting.save()
  }
  else await serverSetting.updateOne({ _id: id }, { [toBeChanged]: change })

}