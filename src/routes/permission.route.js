const express = require('express');
const router = express.Router();
const permissionController = require('@controllers/permission.controller.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.post('/', authorize('create_permissions'), permissionController.create);
router.get('/', authorize('read_permissions'), permissionController.findAll);
router.get('/:id', authorize('read_permissions'), permissionController.findOne);
router.put('/:id', authorize('update_permissions'), permissionController.update);
router.delete('/:id', authorize('delete_permissions'), permissionController.delete);

// Extra lógica
router.get('/:id/roles', authorize('read_permissions'), permissionController.rolesWithPermission);

module.exports = router;
