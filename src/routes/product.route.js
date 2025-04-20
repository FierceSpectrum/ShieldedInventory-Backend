const express = require('express');
const router = express.Router();
const productController = require('@controllers/product.controller.js');
const { validateProduct } = require('@validators/product.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.get('/', jwtAuth, authorize('read_products'), productController.findAll);
router.get('/:id', jwtAuth, authorize('read_products'), productController.findOne);
router.post('/', validateProduct, jwtAuth, authorize('create_products'), productController.create);
router.put('/:id', validateProduct, jwtAuth, authorize('update_products'), productController.update);
router.delete('/:id', jwtAuth, authorize('delete_products'), productController.delete);

// Extra lógica
router.patch('/:id/inventory', jwtAuth, productController.reduceStock);

module.exports = router;
