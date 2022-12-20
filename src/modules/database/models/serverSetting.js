const { model, Schema } = require('mongoose');

module.exports = model('serversetting', new Schema({
  _id: { type: String, required: true },
  shouldBeUnmuted: { type: Boolean, default: true },
  shouldBeUndeafened: { type: Boolean, default: true },
}));