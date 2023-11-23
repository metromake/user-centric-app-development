const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 418);
  res.json({
    error: {
      message: err.message,
      status: err.status || 418,
    },
  });
};

export {notFoundHandler, errorHandler};
