const express = require('express');
const router = express.Router();
const roleController = require('@controllers/role.controller.js');
const { validateRole } = require('@validators/role.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.post('/', validateRole, authorize('create_roles'), roleController.create);
router.get('/', authorize('read_roles'), roleController.findAll);
router.get('/:id', authorize('read_roles'), roleController.findOne);
router.get('/name/:name', authorize('read_roles'), roleController.findByName);
router.put('/:id', validateRole, authorize('update_roles'), roleController.update);
router.delete('/:id', authorize('delete_roles'), roleController.delete);

// Extra lógica
router.post('/:id/permissions', authorize('update_roles'), roleController.assignPermissions);

module.exports = router;
