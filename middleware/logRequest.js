const { requestLogger } = require('../utils/logger');

module.exports = (req, res, next) => {
  requestLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
