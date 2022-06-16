const router = require('express').Router();
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

const { NOT_FOUND_ERROR } = require('../utils/constants');
const {
  login,
  createUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.all('*', () => {
  throw new NotFoundError(NOT_FOUND_ERROR);
});

module.exports = router;
