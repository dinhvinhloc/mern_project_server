const mongoose = require('mongoose');

const aboutmeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  info: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Aboutme', aboutmeSchema);
