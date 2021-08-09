const express = require('express');
const { check, validationResult } = require('express-validator');
let Education = require('../../models/Education');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/educations
//desc Get all educations
//access public
router.get('/', async (req, res) => {
  try {
    const educationDB = await Education.find();
    res.send(educationDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/educations/:id
//desc Get  education by id
//access public
router.get('/user/:userId', async (req, res) => {
  try {
    const education = await Education.findById({
      user: req.params.userId
    });
    if (!education) {
      return res.status(404).send('Education not found');
    }
    res.send(education);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/educations/:id
//desc Get  education by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).send('Education not found');
    }
    res.send(education);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/education
//desc insert education
//access public
router.post(
  '/',
  auth,
  [
    check('syear', 'Start Year is required').not().isEmpty(),
    check('eyear', 'End Year is required').not().isEmpty(),
    check('iname', 'Institute Name is required').not().isEmpty(),
    check('cname', 'Course Name is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newEducation = new Education({
        user: req.user.id,
        syear: req.body.syear,
        eyear: req.body.eyear,
        iname: req.body.iname,
        cname: req.body.cname,
      });

      const result = await newEducation.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/educations/
//desc delete education by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const education = await Education.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!education) {
      return res.status(404).json({ msg: 'Education not found' });
    }


    res.json('Education deleted');

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/educations/
// //desc update education
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
      iname: req.body.iname,
      cname: req.body.cname,
    };
    const education = await Education.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!education) {
      return res.status(404).json({ msg: 'Education not found or user unauthorized. Update denied.' });
    }


    res.json(education);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
