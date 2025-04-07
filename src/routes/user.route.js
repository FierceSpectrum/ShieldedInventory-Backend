const express = require('express');
const router = express.Router();
const userController = require('@controllers/user.controller.js');
const { validateUser } = require('@validators/user.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

// CRUD + extras
router.get('/', jwtAuth, authorize('read_users'), userController.findAll);
router.get('/:id', jwtAuth, authorize('read_users'), userController.findOne);
router.post('/', validateUser, jwtAuth, authorize('create_users'), userController.create);
router.put('/:id', validateUser, jwtAuth, authorize('update_users'), userController.update);
router.delete('/:id', jwtAuth, authorize('delete_users'), userController.delete);

// Extra lógica
router.patch('/:id/password', jwtAuth, userController.changePassword);
router.patch('/:id/last-login', jwtAuth, userController.updateLastLogin);

module.exports = router;
