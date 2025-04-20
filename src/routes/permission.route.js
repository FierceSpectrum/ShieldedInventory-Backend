const express = require('express');
const router = express.Router();
const permissionController = require('@controllers/permission.controller.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.post('/', jwtAuth, authorize('create_permissions'), permissionController.create);
router.get('/', jwtAuth, authorize('read_permissions'), permissionController.findAll);
router.get('/:id', jwtAuth, authorize('read_permissions'), permissionController.findOne);
router.put('/:id', jwtAuth, authorize('update_permissions'), permissionController.update);
router.delete('/:id', jwtAuth, authorize('delete_permissions'), permissionController.delete);

// Extra lógica
router.get('/:id/roles', jwtAuth, authorize('read_permissions'), permissionController.rolesWithPermission);

module.exports = router;
