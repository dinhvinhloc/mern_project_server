const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    require: true,
  },
  proflevel: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Skill', skillSchema);
