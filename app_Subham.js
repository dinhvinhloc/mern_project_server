//server 
const express = require('express');
const educationRoutesDb = require('./routes/api/educationRoutesDB');
const userRoutes = require('./routes/api/userRoutes');
const authRoutes = require('./routes/api/authRoutes');
const connectDB = require('./config/connectDB_Subham');

const app = express();

//connect DB
connectDB();
//set a middleware to parse data
app.use(express.json());

app.use('/api/educations', educationRoutesDb);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});

