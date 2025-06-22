const { auditLogger } = require('../utils/logger');
const { getSession } = require('../services/session.service');

const auditAccess = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const sessionId = req.cookies.sessionId;
    const session = sessionId ? getSession(sessionId) : null;
    const user = session?.username || 'anónimo';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = ((seconds * 1e3) + nanoseconds / 1e6).toFixed(2); // duración en milisegundos
    const entry = `${req.method} ${req.originalUrl} - Usuario: ${user} - IP: ${ip} - Tiempo: ${durationMs}ms - Status: ${res.statusCode}`;
    auditLogger.info(entry);
  });

  next();
};

module.exports = auditAccess;
