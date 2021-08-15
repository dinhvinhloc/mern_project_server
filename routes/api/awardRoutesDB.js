const express = require('express');
const { check, validationResult } = require('express-validator');
let Award = require('../../models/Award');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/awards
//desc Get all awards
//access public
router.get('/', async (req, res) => {
  try {
    const awardDB = await Award.find();
    res.send(awardDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/awards/user/:userId
//desc Get all award by userId
//access public
router.get('/user/:userId', async (req, res) => {
  try {
    const awardDB = await Award.find( {
      user: req.params.userId
    });

    if (!awardDB) {
      return res.status(404).send('Award not found');
    }
    res.send(awardDB);
  } catch (err) {
    throw err;
    res.status(500).send('server error');
  }
});

//route Get api/awards/:id
//desc Get  award by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) {
      return res.status(404).send('Award not found');
    }
    res.send(award);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/awards
//desc insert award
//access restricted
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description longer than 12 characters').isLength({
      min: 12,
    }),
    check('date', 'Date is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newAward = new Award({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
      });

      const result = await newAward.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/awards/
//desc delete award by id
//access restricted
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const award = await Award.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!award) {
      return res.status(404).json({ msg: 'Award not found' });
    }

    res.json('Award deleted');

    //res.json({ msg: 'award deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

//route put api/awards/
//desc update award
//access restricted
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    };
    const award = await Award.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!award) {
      return res.status(404).json({ msg: 'Award not found or user unauthorized. Update denied.' });
    }

    res.json(award);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
