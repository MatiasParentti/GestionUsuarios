const User = require('../models/user.model');
const Userrole = require('../models/role.model');
const Perm = require ('../models/rolpermiso.model');


function getAllUsers(req, res) {
  try {
    const { limit, offset, search, role } = req.query;
    const users = User.getAll({ limit, offset, search, role });
    const perms = [];
    let rolid = [];
    for (let i = 0; i < users.length; i++) {
      if (!rolid.includes(users[i].role_id)) {
        console.log("Resultado: " + users[i].role_id);
        perms.push({
                    role_id: users[i].role_id, 
                    permisos: Perm.getPermisosPorRol(users[i].role_id)
                  }); 
        
                    rolid.push(users[i].role_id);
                  } ;
        
      }
    
    console.log("variable users: "+ JSON.stringify(users));
    console.log("Perm variable: " + JSON.stringify(perms));
    res.render('users/index', { users , perms });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener usuarios');
  }
}



function renderNewUserForm(req, res) {
  try {
    const roles = Userrole.getAll();
  res.render("users/new", { roles });
} catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al cargar formulario");
  }
}

function renderEditUserForm(req, res) {
  try {
    const users = User.getById(req.params.id);
    if (!users) return res.status(404).send("Usuario no encontrado");

    const rol = Userrole.getById(users.role_id);
    const roles = Userrole.getAll();
    
    res.render("users/edit", { users, rol, roles });
  } catch (err) {
    console.error("[Error]", err.message);
    res.status(500).send("Error al cargar formulario");
  }
}

function getUserById(req, res) {
  try {
    const user = User.getById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.render('users/detail', { user });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error en la búsqueda');
  }
}

function createUser(req, res) {
  console.log("createUseantesTry: " + JSON.stringify(req.body));
  try {
     User.create(req.body);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al crear: ' + err.message);
  }
}

async function updateUser(req, res) {
  try {
    User.update(req.params.id, req.body);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al actualizar: ' + err.message);
  }
}

function deleteUser(req, res) {
    try {
    User.softDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al eliminar');
  }
}

module.exports = { renderEditUserForm,getAllUsers, renderNewUserForm, getUserById, createUser, updateUser, deleteUser };