const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
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
  iname: {
    type: String,
    require: true,
  },
  cname: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Education', educationSchema);