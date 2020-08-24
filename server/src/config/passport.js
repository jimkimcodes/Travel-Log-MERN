const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'AdaShelby',
}, (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  // Get User or done(404)
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'No user with given username.' });
      }
      // Validate password
      user.comparePassword(password, done);
    })
    .catch((err) => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
