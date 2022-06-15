const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const { JWT_SECRET_WORD } = require('../utils/config');
const { NOT_AUTH_ERROR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError(NOT_AUTH_ERROR);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_WORD);
  } catch (err) {
    throw new NotAuthError(NOT_AUTH_ERROR);
  }

  req.user = payload;

  next();
};
