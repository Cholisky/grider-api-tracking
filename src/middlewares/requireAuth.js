const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const keys = require('../../keystore');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, keys.JWT_KEY, async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: 'You must be logged in' });
    }

    const { userId } = payload;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send({ error: 'You must be logged in' });
    }

    req.user = user;
    next();
  });
};
