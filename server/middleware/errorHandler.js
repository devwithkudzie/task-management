const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    path: req.path,
    method: req.method,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered',
      field: err.keyValue,
      status: 'error'
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      message: 'Invalid input data',
      details: messages,
      status: 'error'
    });
  }

  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    status: 'error',
    path: req.originalUrl
  });
};

module.exports = errorHandler; 