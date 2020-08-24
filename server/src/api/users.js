const express = require('express');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const passportConfig = require('../config/passport');
const { authMiddleware } = require('../middlewares');

const router = express.Router();
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });

    newUser.save((err3, user) => {
      if (err3) {
        if (err3.keyValue) {
          const field = Object.keys(err3.keyValue)[0];
          const error = new Error(`${field} already exists!`);
          return next(error);
        }
        return next(err3);
      }
      res.json({
        message: 'Create User',
        username: user.username,
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login',
  passport.authenticate('local', {
    session: false,
  }),
  (req, res, next) => {
    if (req.user) {
      JWT.sign({
        user: req.user,
      }, 'AdaShelby', {
        expiresIn: '1h',
      }, (err, token) => {
        res.json({
          isAuthenticated: true,
          token: `Bearer ${token}`,
          user: req.user,
        });
      });
    }
});

router.get('/logout', (req, res) => {
  req.logout();
});

router.get('/user', authMiddleware, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.post('/delete', authMiddleware, (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) next(err);
    user.remove();
  });
});

module.exports = router;
