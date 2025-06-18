const Rol_permiso = require("../models/rolpermiso.model");



function asignarPermiso(req, res) {
  try {
    const { rol_id, permiso_id } = req.body;
    Rol_permiso.asignarPermiso(rol_id, permiso_id);
    res.redirect(`/roles/${rol_id}/permisos`);
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(400).send("Error al asignar: " + err.message);
  }
}


function quitarPermiso(req, res) {
  try {
    const { rol_id, permiso_id } = req.body;
    Rol_permiso.quitarPermiso(rol_id, permiso_id);
    res.redirect(`/roles/${rol_id}/permisos`);
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al quitar: ' + err.message);
  }
}


function getPermisosPorRol(req, res) {
  try {
    const rol_id = req.params.rol_id;
    const permisosAsignados = Rol_permiso.getPermisosPorRol(rol_id);
    res.json(permisosAsignados); 
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener permisos del rol');
  }
}


module.exports = {
  asignarPermiso,quitarPermiso,getPermisosPorRol
};
