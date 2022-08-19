module.exports.handleErrors = (err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;
  const message = err.message || 'На сервере произошла ошибка.';
  res.status(status).send({ message });
  next();
};
