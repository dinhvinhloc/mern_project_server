const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
let User = require('../../models/User');

//route post api/users
//desc insert user
//access public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password longer than 8 characters').isLength({
      min: 8,
    }),
    check('email', 'please enter valid email').isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const hashpass = await bcrypt.hash(req.body.password, 12);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      });

      await newUser.save();

      //get payload info for the user
      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
