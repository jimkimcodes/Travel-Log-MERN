const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401);
    next(new Error('Unauthorized. Found no token!'));
  }
  try {
    await jwt.verify(token.split('Bearer ')[1], 'AdaShelby', (error, decoded) => {
      if (error) {
        res.status(401);
        next(new Error('Unauthorized. Invalid token!'));
      } else {
        req.user = {
          _id: decoded.user._id,
          username: decoded.user.username,
          email: decoded.user.email,
        };
        next();
      }
    });
  } catch (err) {
    console.error('Something wrong with auth middleware');
    res.status(500);
    next(new Error('Server Error!'));
  }
};

const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '😟' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
  authMiddleware,
};
