// server/middleware/errorHandler.js

export function notFound(req, res, next) {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(422).json({
      success: false,
      message: 'Validation error.',
      errors:  messages,
    });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format.',
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate value for field: ${field}.`,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', err);
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error.' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
