const express = require('express');
const { check, validationResult } = require('express-validator');
let Project = require('../../models/Project');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/projects
//desc Get all projects
//access public
router.get('/', async (req, res) => {
  try {
    const projectDB = await Project.find();
    res.send(projectDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/projects/:id
//desc Get  projects by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.send(project);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/projects
//desc insert todo
//access public
router.post(
  '/',
  auth,
  [
    check('name', 'name is required').not().isEmpty(),
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
      const newProject = new Project({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description,
      });

      const result = await newProject.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/projects/
//desc delete project by id
//access public
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const project = await Project.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }


    res.json('project deleted');

    //res.json({ msg: 'project deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

// //route put  api/projects/
// //desc update project
// //access public
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      name: req.body.name,
      name: req.body.name,
      description: req.body.description,
    };
    const project = await Project.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!project) {
      return res.status(404).json({ msg: 'Project not found or user unauthorized. Update denied.' });
    }


    res.json(project);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;
