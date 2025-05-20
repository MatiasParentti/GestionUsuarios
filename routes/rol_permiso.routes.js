const express = require('express');
const router = express.Router();
const controller = require("../controllers/rol_permiso.controller");



router.get('/roles/:rol_id/permisos/json', controller.getPermisosPorRol);
router.post('/roles/:rol_id/permisos/asignar', controller.asignarPermiso);
router.post('/roles/:rol_id/permisos/quitar', controller.quitarPermiso);




module.exports = router;
