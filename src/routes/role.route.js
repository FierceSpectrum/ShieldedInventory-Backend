const express = require('express');
const router = express.Router();
const roleController = require('@controllers/role.controller.js');
const { validateRole } = require('@validators/role.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.post('/', validateRole, jwtAuth, authorize('create_roles'), roleController.create);
router.get('/', jwtAuth, authorize('read_roles'), roleController.findAll);
router.get('/:id', jwtAuth, authorize('read_roles'), roleController.findOne);
router.put('/:id', validateRole, jwtAuth, authorize('update_roles'), roleController.update);
router.delete('/:id', jwtAuth, authorize('delete_roles'), roleController.delete);

// Extra lógica
router.post('/:id/permissions', jwtAuth, authorize('update_roles'), roleController.assignPermissions);

module.exports = router;
