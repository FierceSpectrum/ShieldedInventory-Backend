const express = require('express');
const router = express.Router();
const roleController = require('@controllers/role.controller.js');
const { validateRole } = require('@validators/role.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.get('/', jwtAuth, authorize('read_roles'), roleController.findAll);
// router.get('/:id', jwtAuth, authorize('read_roles'), roleController.getRoleById);
router.post('/', validateRole, jwtAuth, authorize('create_roles'), roleController.create);
// router.put('/:id', validateRole, jwtAuth, authorize('update_roles'), roleController.updateRole);
// router.delete('/:id', jwtAuth, authorize('delete_roles'), roleController.deleteRole);

// Extra lógica
router.post('/:id/permissions', jwtAuth, authorize('update_roles'), roleController.assignPermissions);

module.exports = router;
