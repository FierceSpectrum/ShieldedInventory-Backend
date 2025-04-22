const express = require('express');
const router = express.Router();
const productController = require('@controllers/product.controller.js');
const { validateProduct } = require('@validators/product.validator.js');
const jwtAuth  = require('@middlewares/jwtAuth.js');
const { authorize } = require('@middlewares/authorize.js');

router.use(jwtAuth);

router.get('/', authorize('read_products'), productController.findAll);
router.get('/:id', authorize('read_products'), productController.findOne);
router.post('/', validateProduct, authorize('create_products'), productController.create);
router.put('/:id', validateProduct, authorize('update_products'), productController.update);
router.delete('/:id', authorize('delete_products'), productController.delete);

// Extra lógica
router.patch('/:id/inventory', productController.reduceStock);

module.exports = router;
