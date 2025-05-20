const db = require("../config/db");
const chalk = require("chalk");

function asignarPermiso(rol_id, permiso_id) {
  try {
    const exist = db
      .prepare(
        `
      SELECT COUNT(*) AS total FROM rol_permiso
      WHERE rol_id = ? AND permiso_id = ?
    `
      )
      .get(rol_id, permiso_id);

    if (exist.total > 0) throw new Error("El permiso ya está asignado al rol");

    const result = db
      .prepare(
        `
      INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (?, ?)
    `
      )
      .run(rol_id, permiso_id);

    console.log(
      chalk.green(`[DB] Permiso ID ${permiso_id} asignado al rol ID ${rol_id}`)
    );
    return result;
  } catch (error) {
    console.error(chalk.red(`[Error] Asignando permiso: ${err.message}`));
    throw err;
  }
}

function quitarPermiso(rol_id, permiso_id) {
  const result = db.prepare(`
    DELETE FROM rol_permiso WHERE rol_id = ? AND permiso_id = ?
  `).run(rol_id, permiso_id);

  if (result.changes > 0) {
    console.log(chalk.red(`[DB] Permiso ID ${permiso_id} quitado del rol ID ${rol_id}`));
  } else {
    console.warn(chalk.yellow(`[DB] No se encontró asociación para eliminar`));
  }

  return result;
}

function getPermisosPorRol(rol_id) {
  const query = `
    SELECT permisos.id, permisos.name
    FROM rol_permiso
    JOIN permisos ON rol_permiso.permiso_id = permisos.id
    WHERE rol_permiso.rol_id = ?
    ORDER BY permisos.name
  `;
  const permisos = db.prepare(query).all(rol_id);
  console.log(chalk.blue(`[DB] Permisos para rol ID ${rol_id} obtenidos (${permisos.length})`));
  return permisos;
}

function reemplazarPermisos(rol_id, nuevosPermisosIds) {
  const eliminar = db.prepare('DELETE FROM rol_permiso WHERE rol_id = ?');
  eliminar.run(rol_id);

  const insertar = db.prepare('INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (?, ?)');  

  const insertarPermisos = db.transaction((permisos) => {
    for (const permiso_id of permisos) {
      insertar.run(rol_id, permiso_id);
    }
  });

  if (nuevosPermisosIds.length > 0) {
    insertarPermisos(nuevosPermisosIds);
  }
}

module.exports = { asignarPermiso,quitarPermiso ,getPermisosPorRol, reemplazarPermisos};


