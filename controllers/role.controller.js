// controllers/role.controller.js
const Role = require("../models/role.model");
const Permiso = require("../models/permiso.model");
const RolPermiso = require("../models/rolpermiso.model");

function getAllRoles(req, res) {
  try {
    const roles = Role.getAll();
    res.render("roles/index", { roles });
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al obtener roles");
  }
}

function getRoleById(req, res) {
  try {
    const role = Role.getById(req.params.id);
    if (!role) return res.status(404).send("Rol no encontrado");

    const permisos = Permiso.getAll(); 
    const permisosAsignados = RolPermiso.getPermisosPorRol(req.params.id); 
    const permisosAsignadosIds = permisosAsignados.map(p => p.id); 

    res.render("roles/detail", {
      role,
      permisos,
      permisosAsignadosIds
    });
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al buscar el rol");
  }
}


function renderNewRoleForm(req, res) {
  res.render("roles/new");
}

function renderEditRoleForm(req, res) {
  try {
    const role = Role.getById(req.params.id);
    if (!role) return res.status(404).send("Rol no encontrado");

    const permisos = Permiso.getAll({});
    const permisosAsignados = RolPermiso.getPermisosPorRol(role.id);
    const permisosAsignadosIds = permisosAsignados.map((p) => p.id);

    res.render("roles/edit", { role, permisos, permisosAsignadosIds });
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al cargar formulario");
  }
}

function createRole(req, res) {
  try {
    Role.create(req.body);
    res.redirect("/roles");
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(400).send("Error al crear: " + err.message);
  }
}

function updateRole(req, res) {
  try {
    const { name, permisos = [] } = req.body;
    let permisosIds = [];
    if (Array.isArray(permisos)) {
      permisosIds = permisos.map(Number);
    } else if (typeof permisos === "string") {
      permisosIds = [Number(permisos)];
    }

    Role.update(req.params.id, { name });

    // Actualizar permisos del rol
    RolPermiso.reemplazarPermisos(req.params.id, permisosIds);
    console.log("[Formulario enviado]", req.body);
    res.redirect("/roles");
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(400).send("Error al actualizar: " + err.message);
  }
}

function deleteRole(req, res) {
  try {
    Role.remove(req.params.id);
    res.redirect("/roles");
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al eliminar");
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  renderNewRoleForm,
  renderEditRoleForm,
  createRole,
  updateRole,
  deleteRole,
};
