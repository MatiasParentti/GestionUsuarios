const db = require("../config/db");
const chalk = require("chalk");

function getAll() {
  const permisos = db.prepare("SELECT * FROM permisos").all();
  console.log(chalk.blue(`[DB] ${permisos.length} permisos encontrados`));
  return permisos;
}

function getById(id) {
  const permiso = db.prepare("SELECT * FROM permisos WHERE id = ?").get(id);
  console.log(
    permiso
      ? chalk.blue(`[DB] Permiso ID ${id} encontrado`)
      : chalk.yellow(`[DB] Permiso ID ${id} no encontrado`)
  );
  return permiso;
}

function create({ name }) {
  if (!name || name.length < 3) throw new Error("Nombre del permiso inválido");
  const exists = db
    .prepare(`SELECT COUNT(*) AS total FROM permisos WHERE name = ?`)
    .get(name);
  if (exists.total > 0) throw new Error(`El permiso "${name}" ya existe`);
  const result = db.prepare("INSERT INTO permisos (name) VALUES (?)").run(name);
  console.log(
    chalk.green(`[DB] Permiso creado con ID ${result.lastInsertRowid}`)
  );
  return result;
}

function update(id, { name }) {
  if (!name || name.length < 3) throw new Error("Nombre del permiso inválido");

  const exists = db
    .prepare(
      `
    SELECT COUNT(*) AS total FROM permisos WHERE name = ? AND id != ?
  `
    )
    .get(name, id);
  if (exists.total > 0)
    throw new Error(`Ya existe otro permiso con el nombre "${name}"`);

  const result = db
    .prepare("UPDATE permisos SET name = ? WHERE id = ?")
    .run(name, id);
  console.log(
    chalk.cyan(`[DB] Permiso ID ${id} actualizado (${result.changes} cambio/s)`)
  );
  return result;
}

function remove(id) {
  const result = db.prepare("DELETE FROM permisos WHERE id = ?").run(id);
  console.log(
    chalk.red(`[DB] Permiso ID ${id} eliminado (${result.changes} cambio/s)`)
  );
  return result;
}

module.exports = { getAll, getById, create, update, remove };
