const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }, title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    },
    educations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'educations'
        }
    ]
    ,
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'experiences'
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skills'
        }
    ],
    languages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'language'
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }
    ],

    awards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'awards'
        }
    ],
    hobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hobbies'
        }
    ],
    aboutmes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'aboutmes'
        }
    ]
});

module.exports = mongoose.model('Resume', ResumeSchema);
