const { body } = require('express-validator');

exports.validateRole = [
  body('name').notEmpty().withMessage('El nombre del rol es obligatorio'),
];
