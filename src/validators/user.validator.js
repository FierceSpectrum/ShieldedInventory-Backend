const { body } = require('express-validator');

exports.validateUser = [
  body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];
