const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { NOT_EMAIL_ERROR, NOT_EMAIL_OR_PASSWORD_ERROR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: NOT_EMAIL_ERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(NOT_EMAIL_OR_PASSWORD_ERROR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(NOT_EMAIL_OR_PASSWORD_ERROR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
