const NOT_AUTH_ERROR = 'Необходима авторизация';
const FORBIDDEN_ERROR = 'Недостаточно прав для удаления фильма';
const NOT_FOUND_ERROR = 'Запрашиваемый ресурс не найден';
const NOT_FOUND_ERROR_USER = 'Пользователь не найден';
const NOT_FOUND_ERROR_MOVIE = 'Фильм не найден';
const SERVER_DOWN_ERROR = 'Сервер сейчас упадёт';
const SERVER_ERROR = 'На сервере произошла ошибка';
const NOT_REQ_ERROR = 'Переданы некорректные данные';
const UNIQUE_ERROR = 'Пользователь с таким email уже существует';
const URL_ERROR = 'Неправильный формат URL';
const NOT_EMAIL_ERROR = 'Введенный адрес не является Email-ом';
const NOT_EMAIL_OR_PASSWORD_ERROR = 'Неверно указана почта или пароль';

module.exports = {
  NOT_AUTH_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  NOT_FOUND_ERROR_USER,
  NOT_FOUND_ERROR_MOVIE,
  SERVER_DOWN_ERROR,
  SERVER_ERROR,
  NOT_REQ_ERROR,
  UNIQUE_ERROR,
  URL_ERROR,
  NOT_EMAIL_ERROR,
  NOT_EMAIL_OR_PASSWORD_ERROR,
};
