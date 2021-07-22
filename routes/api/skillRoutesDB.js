const express = require('express');
const { check, validationResult } = require('express-validator');
let Skill = require('../../models/Skill');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/todos
//desc Get all todos
//access public
router.get('/', async (req, res) => {
  try {
    const skillDB = await Skill.find();
    res.send(skillDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/todos/:id
//desc Get  todos by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).send('Skill not found');
    }
    res.send(skill);
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
    check('name', 'name is required').not().isEmpty(),
    check('proflevel', 'proflevel is required').not().isEmpty(),
    check('description', 'Description longer than 12 characters').isLength({
      min: 12,
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newSkill = new Skill({
        user: req.user.id,
        name: req.body.name,
        proflevel: req.body.proflevel,
        description: req.body.description,
      });

      const result = await newSkill.save();
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
    const skill = await Skill.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    // const result = await Skill.findByIdAndDelete({ _id: req.body.id });

    res.json('skill deleted');

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
const update = { name: req.body.name,
  proflevel: req.body.proflevel,
  description: req.body.description,    };



    const skill = await Skill.findOneAndUpdate(filter, update, {
        new: true
      });
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found or user unauthorized. Update denied.' });
    }
    // task.title = req.body.title;
    // task.description = req.body.description;
    // task.category = req.body.category;
    // task.date = req.body.date; 
    // await task.save();

    // res.send(task);

    res.json(skill);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
