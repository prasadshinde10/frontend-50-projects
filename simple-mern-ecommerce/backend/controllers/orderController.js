const Order = require('../models/Order');

const createOrder = async (req, res) => {
  // This controller creates an order from the cart and stores a simple mock payment status.
  const { orderItems, totalPrice, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items provided' });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalPrice,
    paymentMethod: paymentMethod || 'Mock Payment',
    isPaid: true,
    paidAt: new Date(),
  });

  res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  // This controller returns only the logged-in user's order history.
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

module.exports = { createOrder, getMyOrders };
