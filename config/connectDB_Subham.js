const mongoose = require('mongoose');
const config = require('config');

const dbcon = config.get('mongoDBConnection_Subham');

const connectDB = async () => {
  try {
    await mongoose.connect(dbcon, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('database connected');
  } catch (err) {
    console.log('unable to connect' + err);
  }
};

module.exports = connectDB;