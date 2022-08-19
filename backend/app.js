const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-unresolved
const { errors, celebrate, Joi } = require('celebrate');

const { login, postUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { handleErrors } = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// импортируем роутер
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

// Подключаем экспресс
const app = express();

// Подключаемся к серверу монго
mongoose.connect('mongodb://localhost:27017/mestodb');

// Подключаем пакет body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/),
  }),
}), postUser);

// Запускаем роутинг
const logger = (req, res, next) => {
  console.log('Запрос залогирован!');
  next();
};

app.use(logger);
app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

// запрос к несуществующему роуту
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
