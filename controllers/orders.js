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

const updateOrder = async (req, res) => {
  try {
    // Validate the new status in the request body
    const validStatuses = ['pending', 'shipped', 'canceled'];
    const { status } = req.body;

    // Ensure the status is one of the valid statuses
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid status value. Valid statuses are: pending, shipped, canceled.',
      });
    }

    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        status: 'failed',
        message: 'Order not found.',
      });
    }

    // Update the order's status
    order.status = status;
    await order.save();

    // Send the updated order back to the client
    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (err) {
    console.error('Failed to update order:', err);
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};



const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error('Failed to delete order:', err); // Log the error details
    res.status(500).json({
      status: 'failed',
      message: err.message
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
};