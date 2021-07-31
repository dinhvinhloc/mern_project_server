const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  syear: {
    type: String,
    require: true,
  },
  eyear: {
    type: String,
    require: true,
  },
  cname: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Experience', experienceSchema);