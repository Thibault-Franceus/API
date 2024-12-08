var express = require('express');
var router = express.Router();
const ordersController = require('../controllers/orders');
const passport = require('passport');

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
