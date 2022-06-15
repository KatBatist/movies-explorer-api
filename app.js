require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const cors = require('cors');

const { errors } = require('celebrate');

const { MONGO_DB_NAME, ALLOWED_CORS, PORT_NUMBER } = require('./utils/config');
const { NOT_FOUND_ERROR, SERVER_DOWN_ERROR } = require('./utils/constants');

const rateLimit = require('./middlewares/rateLimit');

const { validateCreateUser, validateLogin } = require('./middlewares/validate');
const err = require('./middlewares/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');

const NotFoundError = require('./errors/not-found-err');

const { PORT = PORT_NUMBER } = process.env;

const app = express();

app.use(cors({
  origin: ALLOWED_CORS,
}));

mongoose.connect(MONGO_DB_NAME);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rateLimit);

app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_DOWN_ERROR);
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', moviesRoutes);
app.all('*', () => {
  throw new NotFoundError(NOT_FOUND_ERROR);
});

app.use(errorLogger);

app.use(errors());

app.use(err);

app.listen(PORT);
