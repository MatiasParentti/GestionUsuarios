const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const SESSIONS_FILE = path.join(__dirname, '../data/sessions.json');

const readSessions = () => {
  if (!fs.existsSync(SESSIONS_FILE)) return {};
  return JSON.parse(fs.readFileSync(SESSIONS_FILE));
};

const writeSessions = (sessions) => {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
};


const createSession = (username) => {
  const sessions = readSessions();
  const sessionId = randomUUID();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hora

  sessions[sessionId] = { 
    username, 
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString()
  };

  writeSessions(sessions);
  return sessionId;
};


const getSession = (sessionId) => {
  const sessions = readSessions();
  const session = sessions[sessionId];
  if (!session) return null;

  const now = new Date();
  if (new Date(session.expiresAt) < now) {
    delete sessions[sessionId]; // Limpieza opcional
    writeSessions(sessions);
    return null;
  }

  return session;
};
//const getSession = (sessionId) => {
//  const sessions = readSessions();
//  return sessions[sessionId] || null;
//};

const deleteSession = (sessionId) => {
  const sessions = readSessions();
  delete sessions[sessionId];
  writeSessions(sessions);
};

module.exports = { createSession, getSession, deleteSession };
