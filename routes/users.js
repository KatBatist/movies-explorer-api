const usersRouter = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validate');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', validateUpdateUser, updateUser);

module.exports = usersRouter;
