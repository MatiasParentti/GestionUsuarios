const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

const registerUser = (username, password) => {
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    throw new Error('Usuario ya existe');
  }
  users.push({ username, password });
  writeUsers(users);
};

const loginUser = (username, password) => {
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Credenciales inválidas');
};

module.exports = { registerUser, loginUser };
