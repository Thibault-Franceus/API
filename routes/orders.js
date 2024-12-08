var express = require('express');
var router = express.Router();
const ordersController = require('../controllers/orders');
const passport = require('passport');

router.get('/', ordersController.getOrders);
router.post('/', ordersController.createOrder);
router.post('/', passport.authenticate('jwt', {session:false}), ordersController.createOrder);
router.get('/:id', passport.authenticate('jwt', {session:false}), ordersController.getOrder);
router.put('/:id', passport.authenticate('jwt', {session:false}), ordersController.updateOrder);
router.delete('/:id', passport.authenticate('jwt', {session:false}), ordersController.deleteOrder);



router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);
module.exports = router;
