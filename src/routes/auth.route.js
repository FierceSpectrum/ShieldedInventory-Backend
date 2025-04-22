const expess = require('express');
const router = expess.Router();
const authController = require('@controllers/auth.controller.js');
const loginLimiter = require('@middlewares/loginLimiter.js');

router.use(loginLimiter);

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;