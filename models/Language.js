const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  language: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Language', languageSchema);
