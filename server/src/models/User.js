/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LogEntry = require('./LogEntry');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LogEntry',
  }],
}, {
  timestamps: true,
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (err1, salt) => {
    if (err1) return next(err1);
    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err2) return next(err2);
      this.password = hash;
      next();
    });
  });
});

UserSchema.pre('remove', function (next) {
  LogEntry.remove({ user: this }).exec();
  next();
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isValid) => {
    if (err) return callback(err);
    if (!isValid) {
      return callback(null, false, { message: 'Incorrect password! Please check your password' });
    }
    return callback(null, this);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
