const Order = require('../models/Order');

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      status: 'success',
      data: {
        orders
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message
    });
  }
};

const createOrder = async (req, res, next) => {
  try {

    const order = new Order({
      customizations: req.body.customizations
    });
    await order.save();
    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (err) {
    console.error('Failed to save order:', err); // Log the error details
    res.status(500).json({
      status: 'failed',
      message: err.message
    });
  }
};

// changin the order status from pending to shipped 



module.exports = {
  getOrders,
  createOrder
};