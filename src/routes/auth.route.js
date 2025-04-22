const expess = require('express');
const router = expess.Router();
const authController = require('@controllers/auth.controller.js');
const loginLimiter = require('@config/loginRateLimiter.js');
const { validateUser } = require('@validators/user.validator.js');

router.use(loginLimiter);

router.post('/login', authController.login);
router.post('/register', validateUser, authController.register);

module.exports = router;