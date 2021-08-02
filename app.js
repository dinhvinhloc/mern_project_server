//server
const express = require('express');
const userRoutes = require('./routes/api/userRoutes');
const authRoutes = require('./routes/api/authRoutes');
const connectDB = require('./config/connectDB');
const skillRoutesDb = require('./routes/api/skillRoutesDB');
const aboutMeRoutesDb = require('./routes/api/aboutMeRoutesDB');
const projectRoutesDb = require('./routes/api/projectRoutesDB');
const languageRoutesDb = require('./routes/api/languageRoutesDB');
const educationRoutesDb = require('./routes/api/educationRoutesDB');
const experienceRoutesDb = require('./routes/api/experienceRoutesDB');
const awardRoutesDb = require('./routes/api/awardRoutesDB');
const contactRoutesDb = require('./routes/api/contactRoutesDB');
const hobbyRoutesDb = require('./routes/api/hobbyRoutesDB');


const resumeRoutesDb = require('./routes/api/resumeRoutesDb');


const app = express();

//connect DB
connectDB();
//set a middleware to parse data
app.use(express.json());

app.use('/api/hobbies', hobbyRoutesDb);
app.use('/api/contacts', contactRoutesDb);
app.use('/api/awards', awardRoutesDb);
app.use('/api/skills', skillRoutesDb);
app.use('/api/aboutme', aboutMeRoutesDb);
app.use('/api/projects', projectRoutesDb);
app.use('/api/languages', languageRoutesDb);
app.use('/api/educations', educationRoutesDb);
app.use('/api/experiences', experienceRoutesDb);
app.use('/api/resumes', resumeRoutesDb);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started');
});

