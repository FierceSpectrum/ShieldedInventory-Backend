const express = require('express');
const router = express.Router();
const productController = require('@controllers/product.controller.js');
const { validateProduct } = require('@validators/product.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorizeUser } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.get('/', authorizeUser('product_read'), productController.findAll);
router.get('/:id', authorizeUser('product_read'), productController.findOne);
router.post('/', validateProduct, authorizeUser('product_create'), productController.create);
router.put('/:id', validateProduct, authorizeUser('product_update'), productController.update);
router.delete('/:id', authorizeUser('product_delete'), productController.delete);

// Extra lógica
router.patch('/:id/inventory', authorizeUser('product_update'), productController.reduceStock);

module.exports = router;
