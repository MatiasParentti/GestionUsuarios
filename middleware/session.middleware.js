const { getSession } = require('../services/session.service');

const sessionMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  console.log('[Middleware] sessionId:', sessionId); // DEBUG

  if (!sessionId) return res.status(401).json({ error: 'Sesión no encontrada' });

  const session = getSession(sessionId);
  if (!session) return res.status(401).json({ error: 'Sesión inválida' });

  req.user = { username: session.username };
  next();
};

module.exports = sessionMiddleware;
