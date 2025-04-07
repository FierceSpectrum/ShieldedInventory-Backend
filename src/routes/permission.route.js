const express = require('express');
const router = express.Router();
const permissionController = require('@controllers/permission.controller.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

// router.get('/', jwtAuth, authorize('read_permissions'), permissionController.getAllPermissions);
// router.get('/:id', jwtAuth, authorize('read_permissions'), permissionController.getPermissionById);

// Extra lógica
router.get('/:id/roles', jwtAuth, authorize('read_permissions'), permissionController.rolesWithPermission);

module.exports = router;
