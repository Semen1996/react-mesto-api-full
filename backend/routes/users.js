// Создаем роутер
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

// Добавляем контролеров
const {
  sendUser, sendAllUsers, updateProfile, updateAvatar, sendMe,
} = require('../controllers/users');

// Информация о текущем пользователе
router.get('/users/me', sendMe);

// Возвращаем пользователя по id
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), sendUser);

// Возвращаем всех пользователей
router.get('/users', sendAllUsers);

// Обновить профиль
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

// Обновить аватар
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
  }),
}), updateAvatar);

module.exports = router;
