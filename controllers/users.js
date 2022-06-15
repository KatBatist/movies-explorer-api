const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const NotAuthError = require('../errors/not-auth-err');
const NotReqError = require('../errors/not-req-err');
const UniqueError = require('../errors/unique-err');

const { JWT_SECRET_WORD } = require('../utils/config');
const { NOT_FOUND_ERROR_USER, NOT_REQ_ERROR, UNIQUE_ERROR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotReqError(`${NOT_REQ_ERROR}: ${err}`));
      }
      if (err.code === 11000) {
        next(new UniqueError(UNIQUE_ERROR));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_USER);
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotReqError(`${NOT_REQ_ERROR}: ${err}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_WORD, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new NotAuthError(err.message);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_USER);
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
};
