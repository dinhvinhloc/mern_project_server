const express = require('express');
const { check, validationResult } = require('express-validator');
let Language = require('../../models/Language');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/languages
//desc Get all languages
//access public
router.get('/', async (req, res) => {
  try {
    const languageDB = await Language.find();
    res.send(languageDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/languages/user/:userId
//desc Get all languages by userId
//access public
router.get('/user/:userId', async (req, res) => {
  try {
    const languageDB = await Language.find({
      user: req.params.userId
    });

    if (!languageDB) {
      return res.status(404).send('Language not found');
    }
    res.send(languageDB);
  } catch (err) {
    throw err
    res.status(500).send('server error');
  }
});


//route Get api/languages/:id
//desc Get  languages by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).send('Language not found');
    }
    res.send(language);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/languages
//desc insert todo
//access public
router.post(
  '/',
  auth,
  [
    check('language', 'Language is required').not().isEmpty(),
    check('level', 'Level is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newLanguage = new Language({
        user: req.user.id,
        language: req.body.language,
        level: req.body.level,
      });

      const result = await newLanguage.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/languages/
//desc delete language by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const language = await Language.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!language) {
      return res.status(404).json({ msg: 'Language not found' });
    }


    res.json('language deleted');

    //res.json({ msg: 'language deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/languages/
// //desc update language
// //access public
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      language: req.body.language,
      level: req.body.level,
    };
    const language = await Language.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!language) {
      return res.status(404).json({ msg: 'Language not found or user unauthorized. Update denied.' });
    }


    res.json(language);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
