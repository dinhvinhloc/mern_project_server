const express = require('express');
const { check, validationResult } = require('express-validator');
let Experience = require('../../models/Experience');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/experience
//desc Get all experiences
//access public
router.get('/', async (req, res) => {
  try {
    const experienceDB = await Experience.find();
    res.send(experienceDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/experiences/:id
//desc Get  experience by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).send('Experience not found');
    }
    res.send(experience);
  } catch (err) {
    res.status(500).send('server error');
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const experience = await Experience.find({
      user: req.params.userId
    });
    if (!experience) {
      return res.status(404).send('Experience not found');
    }
    res.send(experience);
  } catch (err) {
    res.status(500).send('server error');
  }
});


//route post api/experience
//desc insert experience
//access public
router.post(
  '/',
  auth,
  [
    check('syear', 'Start Year is required').not().isEmpty(),
    check('eyear', 'End Year is required').not().isEmpty(),
    check('cname', 'Company Name is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newExperience = new Experience({
        user: req.user.id,
        syear: req.body.syear,
        eyear: req.body.eyear,
        cname: req.body.cname,
        position: req.body.position,
        description: req.body.description
      });

      const result = await newExperience.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/experiences/
//desc delete experience by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const experience = await Experience.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }


    res.json('Experience deleted');

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/experiences/
// //desc update experience
// //access public
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      syear: req.body.syear,
      eyear: req.body.eyear,
      cname: req.body.cname,
      position: req.body.position,
      description: req.body.description
    };
    const experience = await Experience.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found or user unauthorized. Update denied.' });
    }


    res.json(experience);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
