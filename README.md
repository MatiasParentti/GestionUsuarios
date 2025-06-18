

# Gestión de Permisos por Rol

* Para el trabajo creamos 4 perimisos: editar_roles, editar_permisos, crear_roles y crear_permisos. Los dos primeros de edicion es para una gestion total de los roles y permisos asi como tambien la posibilidad de asignar permisos a un rol en especifico; los dos segundos permisos habilitarian solo el alta de nuevos permisos o roles. 

* Para poder asignar un permiso hay que ir a la ruta del rol para editarlo y asignar el permiso deseado en los checkbox y actualizar. Lo que hace el sistema es guardar los id de los permisos asignados en la tabla rol_permiso junto con el id de dicho rol.

ejemplo:

| rol_id | permiso_id |
|--------|------------|
|   2    |     1      |
|   2    |     2      |
|   2    |     3      |
|   2    |     4      |
|   5    |     4      |

* Para poder visualizar todos los permisos vamos a la ruta http://localhost:3000/permisos o bien para ver que permisos tiene un rol vamos a la ruta de un rol http://localhost:3000/roles/2 que nos lista que permisos tiene asignado

ejemplo:

Permisos asignados
- Editar roles
- Editar permisos
- Crear permiso
- Crear rol

