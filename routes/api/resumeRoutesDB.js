const express = require('express');
const { check, validationResult } = require('express-validator');
let Resume = require('../../models/Resume');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/resumes
//desc Get all resumes
//access public
router.get('/', async (req, res) => {
  try {
    const resumeDB = await Resume.find();
    res.send(resumeDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/resumes/:id
//desc Get  resumes by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const resume = await resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send('Resume not found');
    }
    res.send(resume);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/resumes
//desc insert todo
//access public
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newResume = new Resume({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        educations: req.body.educations || [],
        experiences: req.body.experiences || [],
        skills: req.body.skills || [],
        languages: req.body.languages || [],
        projects: req.body.projects || [],
        awards: req.body.awards || [],
        hobbies: req.body.hobbies || [],
        aboutmes: req.body.aboutmes || [],
      });

      const result = await newResume.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/resumes/
//desc delete resume by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const Resume = await Resume.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }


    res.json('resume deleted');

    //res.json({ msg: 'resume deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/resumes/
// //desc update resume
// //access public
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      educations: req.body.educations || [],
      experiences: req.body.experiences || [],
      skills: req.body.skills || [],
      languages: req.body.languages || [],
      projects: req.body.projects || [],
      awards: req.body.awards || [],
      hobbies: req.body.hobbies || [],
      aboutmes: req.body.aboutmes || [],
    };
    const resume = await Resume.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found or user unauthorized. Update denied.' });
    }
    res.json(resume);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
