const express = require('express');
const router = express.Router();
const userController = require('@controllers/user.controller.js');
const { validateUser } = require('@validators/user.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.use(jwtAuth);

// CRUD + extras
router.get('/', authorize('read_users'), userController.findAll);
router.get('/:id', authorize('read_users'), userController.findOne);
router.post('/', validateUser, authorize('create_users'), userController.create);
router.put('/:id', validateUser, authorize('update_users'), userController.update);
router.delete('/:id', authorize('delete_users'), userController.delete);

// Extra lógica
router.patch('/:id/password', validateUser, userController.changePassword);
router.patch('/:id/last-login', userController.updateLastLogin);
router.patch('/:id/assign-roles', authorize('assign_roles'), userController.assignRoles);

module.exports = router;
