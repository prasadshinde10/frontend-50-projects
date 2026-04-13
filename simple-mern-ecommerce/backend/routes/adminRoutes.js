const express = require('express');
const { getUsers, getAllOrders } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/users', protect, adminOnly, getUsers);
router.get('/orders', protect, adminOnly, getAllOrders);

module.exports = router;
