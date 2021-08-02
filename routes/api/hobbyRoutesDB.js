const express = require('express');
const { check, validationResult } = require('express-validator');
let Hobby = require('../../models/Hobby');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/hobbies
//desc Get all hobbies
//access public
router.get('/', async (req, res) => {
  try {
    const hobbyDB = await Hobby.find();
    res.send(hobbyDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/hobbies/:id
//desc Get  hobby by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) {
      return res.status(404).send('hobby not found');
    }
    res.send(hobby);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/hobbies
//desc insert hobby
//access restricted
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    phone('type', 'Type is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newHobby = new Hobby({
        user: req.user.id,
        name: req.body.name,
        type: req.body.type,
      });

      const result = await newHobby.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);


//route delete api/hobbies/
//desc delete hobby by id
//access restricted
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const hobby = await Hobby.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!hobby) {
      return res.status(404).json({ msg: 'hobby not found' });
    }

    res.json('hobby deleted');

    //res.json({ msg: 'hobby deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

//route put api/hobbies/
//desc update hobby
//access restricted
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      name: req.body.name,
      type: req.body.type,
    };
    const hobby = await Hobby.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!hobby) {
      return res.status(404).json({ msg: 'hobby not found or user unauthorized. Update denied.' });
    }

    res.json(hobby);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;