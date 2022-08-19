// Создаем роутер
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

// Добавляем контролеров
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');

// Удаляем карточку
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);

// Показываем все карточки
router.get('/cards', getAllCards);

// Создаем новую карточку
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный URL адрес');
      }
      return value;
    }),
  }),
}), createCard);

// Обновить профиль
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);

// Обновить аватар
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);

module.exports = router;
