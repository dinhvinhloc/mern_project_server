const express = require('express');
const { check, validationResult } = require('express-validator');
let Aboutme = require('../../models/Aboutme');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/todos
//desc Get all todos
//access public
router.get('/', async (req, res) => {
  try {
    const aboutmeDB = await Aboutme.find();
    res.send(aboutmeDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/todos/:id
//desc Get  todos by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const aboutme = await Aboutme.findById(req.params.id);
    if (!aboutme) {
      return res.status(404).send('About Me Info not found');
    }
    res.send(aboutme);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/todos
//desc insert todo
//access public
router.post(
  '/',
  auth,
  [
    check('info', 'About me info is required').not().isEmpty(),
    check('info', 'About me Info should be longer than 30 characters').isLength({
      min: 30,
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newAboutme = new Aboutme({
        user: req.user.id,
        info: req.body.info,
      });

      const result = await newAboutme.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/tasks/
//desc delete task by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const aboutme = await Aboutme.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!aboutme) {
      return res.status(404).json({ msg: 'About me info not found' });
    }

    // const result = await Skill.findByIdAndDelete({ _id: req.body.id });

    res.json('about me info deleted');

    //res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/tasks/
// //desc update task
// //access public
router.put('/',auth,  async (req, res) => {
  try {
    // find the element
    const filter = { user: req.user.id,
        _id: req.body.id, };
const update = { info: req.body.info,    };



    const aboutme = await Aboutme.findOneAndUpdate(filter, update, {
        new: true
      });
    if (!aboutme) {
      return res.status(404).json({ msg: 'About me info not found or user unauthorized. Update denied.' });
    }
    // task.title = req.body.title;
    // task.description = req.body.description;
    // task.category = req.body.category;
    // task.date = req.body.date; 
    // await task.save();

    // res.send(task);

    res.json(aboutme);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
