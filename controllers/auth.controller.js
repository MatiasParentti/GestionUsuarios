const { registerUser, loginUser } = require('../services/auth.service');
const { createSession, deleteSession, getSession } = require('../services/session.service');

const register = (req, res) => {
  const { username, password } = req.body;
  try {
    registerUser(username, password);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  try {
    loginUser(username, password);
    const sessionId = createSession(username);
    res.cookie('sessionId', sessionId, { httpOnly: true });
    res.json({ message: 'Login exitoso' });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) deleteSession(sessionId);
  res.clearCookie('sessionId');
  res.json({ message: 'Logout exitoso' });
};

const me = (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) return res.status(401).json({ error: 'Sesión no encontrada' });

  const session = getSession(sessionId);
  if (!session) return res.status(401).json({ error: 'Sesión inválida' });

  res.json({ username: session.username });
};

module.exports = { register, login, logout, me };
