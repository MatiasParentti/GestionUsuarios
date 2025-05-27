const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAllUsers);
router.get('/new', controller.renderNewUserForm);
router.get('/:id/edit', controller.renderEditUserForm);
router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);
router.post('/:id', controller.updateUser);
router.post('/:id/delete', controller.deleteUser);


module.exports = router;