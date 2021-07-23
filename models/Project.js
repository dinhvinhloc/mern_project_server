const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Project', projectSchema);
