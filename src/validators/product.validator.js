const { body } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
];
