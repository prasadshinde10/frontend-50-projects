const User = require('../models/User');
const Order = require('../models/Order');

const getUsers = async (req, res) => {
  // This controller lets admins review all users without exposing passwords.
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

const getAllOrders = async (req, res) => {
  // This controller gives admins a complete order list for operations and support.
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(orders);
};

module.exports = { getUsers, getAllOrders };
