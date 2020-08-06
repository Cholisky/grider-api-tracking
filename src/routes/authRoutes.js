const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../../keystore');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, keys.JWT_KEY);

    res.send({ token });
  } catch (error) {
    console.error('Signup error: ', error);
    return res.status(422).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: 'Invalid password or email' });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, keys.JWT_KEY);
    res.send({ token });
  } catch (error) {
    return res.status(404).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
