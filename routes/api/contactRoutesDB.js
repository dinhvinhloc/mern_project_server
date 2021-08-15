const express = require('express');
const { check, validationResult } = require('express-validator');
let Contact = require('../../models/Contact');

const auth = require('../../middleware/auth');

const router = express.Router();

//route Get api/contacts
//desc Get all contacts
//access public
router.get('/', async (req, res) => {
  try {
    const contactDB = await Contact.find();
    res.send(contactDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/contacts/user/:userId
//desc Get all contact by userid
//access public
router.get('/user/:userId', async (req, res) => {
  try {
    const contactDB = await Contact.find({
      user: req.params.userId
    });

    if (!contactDB) {
      return res.status(404).send('Contact info not found');
    }
    res.send(contactDB);
  } catch (err) {
    throw err
    res.status(500).send('server error');
  }
});

//route Get api/contacts/:id
//desc Get  contact by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.send(contact);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route post api/contacts
//desc insert contact
//access restricted
router.post(
  '/',
  auth,
  [
    check('email', 'Valid email is required').isEmail(),
    check('phone', 'Phone should be longer than 10 dgits').isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newContact = new Contact({
        user: req.user.id,
        email: req.body.email,
        phone: req.body.phone,
        webURL: req.body.webURL,
      });

      const result = await newContact.save();
      res.send(result);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

//route delete api/contacts/
//desc delete contact by id
//access restricted
router.delete('/', auth, async (req, res) => {
  try {
    // find the element
    const contact = await Contact.findOneAndRemove({
      user: req.user.id,
      _id: req.body.id,
    });
    if (!contact) {
      return res.status(404).json({ msg: 'contact not found' });
    }

    res.json('contact deleted');

    //res.json({ msg: 'contact deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 44');
  }
});

//route put api/contacts/
//desc update contact
//access restricted
router.put('/', auth, async (req, res) => {
  try {
    // find the element
    const filter = {
      user: req.user.id,
      _id: req.body.id,
    };
    const update = {
      email: req.body.email,
      phone: req.body.phone,
      webURL: req.body.webURL,
    };
    const contact = await Contact.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found or user unauthorized. Update denied.' });
    }

    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error 55');
  }
});

module.exports = router;