//server 
const express = require('express');
const skillRoutesDb = require('./routes/api/skillRoutesDb');
const aboutMeRoutesDb = require('./routes/api/aboutMeRoutesDB');
const userRoutes = require('./routes/api/userRoutes');
const authRoutes = require('./routes/api/authRoutes');
const connectDB = require('./config/connectDB');

const app = express();

//connect DB
connectDB();
//set a middleware to parse data
app.use(express.json());

app.use('/api/skills', skillRoutesDb);
app.use('/api/aboutme', aboutMeRoutesDb);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});

