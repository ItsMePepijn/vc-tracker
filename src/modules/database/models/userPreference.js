const { model, Schema } = require('mongoose');

module.exports = model('userpreference', new Schema({
  _id: { type: String, required: true },
  globalTracking: {
    isAsked: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: false },
  }
}));