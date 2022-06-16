require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const cors = require('cors');

const { errors } = require('celebrate');

const { MONGO_DB_NAME, ALLOWED_CORS, PORT_NUMBER } = require('./utils/config');
const { SERVER_DOWN_ERROR } = require('./utils/constants');

const rateLimit = require('./middlewares/rateLimit');

const err = require('./middlewares/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { PORT = PORT_NUMBER, NODE_ENV, MONGO_DB_NAME_PRODUCTION } = process.env;

const app = express();

app.use(cors({
  origin: ALLOWED_CORS,
}));

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_NAME_PRODUCTION : MONGO_DB_NAME);

app.use(requestLogger);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rateLimit);

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_DOWN_ERROR);
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(err);

app.listen(PORT);
