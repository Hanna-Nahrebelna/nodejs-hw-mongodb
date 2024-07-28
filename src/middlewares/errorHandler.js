const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage,
    data: err.message,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
      data: err.data || null,
    },
  });
};

export default errorHandler;