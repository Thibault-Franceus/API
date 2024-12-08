var express = require('express');
var router = express.Router();
const ordersController = require('../controllers/orders');

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);
module.exports = router;
