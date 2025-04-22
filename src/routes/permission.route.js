const express = require('express');
const router = express.Router();
const permissionController = require('@controllers/permission.controller.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorizeApp } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.get('/', authorizeApp('permission_read'), permissionController.findAll);
router.get('/:id', authorizeApp('permission_read'), permissionController.findOne);
router.post('/', authorizeApp('permission_create'), permissionController.create);
router.put('/:id', authorizeApp('permission_update'), permissionController.update);
router.delete('/:id', authorizeApp('permission_delete'), permissionController.delete);

// Extra lógica
router.get('/:id/roles', authorizeApp('permission_read'), permissionController.rolesWithPermission);

module.exports = router;
