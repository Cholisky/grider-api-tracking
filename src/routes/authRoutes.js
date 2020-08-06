const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../keystore');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({userId: user._id}, keys.JWT_KEY);

    res.send({ token });
  } catch (error) {
    console.error('Signup error: ', error);
    return res.status(422).send(error.message);
  }
});

module.exports = router;
