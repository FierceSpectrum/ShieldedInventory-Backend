const express = require('express');
const router = express.Router();
const roleController = require('@controllers/role.controller.js');
const { validateRole } = require('@validators/role.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorizeApp } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.get('/', authorizeApp('role_read'), roleController.findAll);
router.get('/:id', authorizeApp('role_read'), roleController.findOne);
router.get('/name/:name', authorizeApp('role_read'), roleController.findByName);
router.post('/', validateRole, authorizeApp('role_creat'), roleController.create);
router.put('/:id', validateRole, authorizeApp('role_update'), roleController.update);
router.delete('/:id', authorizeApp('role_delete'), roleController.delete);

// Extra lógica
router.post('/:id/permissions', authorizeApp('role_update'), roleController.assignPermissions);

module.exports = router;
