const errorHandler = (err, req, res, next) => {  
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: "Something went wrong",
    data: err.message || 'Internal Server Error',
  });
};

export default errorHandler;