const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const router = express.Router();
let User = require('../../models/User');

//route post api/users
//desc authenticate user and get token
//access public
router.post(
  '/',
  [
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

      //see if user exists
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json(
          {
            errors: [
              { msg: 'Invalid credential email' }
            ]
          },
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            { msg: 'Invalid credential password' }
          ]
        });
      }

      //get payload info for the user
      const payload = {
        user: {
          id: user.id,
          name: user.email,
        },
      };

      const userEmail = user.email;
      const userId = user.id

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ userId, userEmail, token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
