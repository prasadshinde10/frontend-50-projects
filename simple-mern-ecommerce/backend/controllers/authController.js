const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const registerUser = async (req, res) => {
  // This controller creates a new user account and returns a JWT for instant login.
  const { name, email, password } = req.body;
  const safeName = typeof name === 'string' ? name.trim() : '';
  const safeEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const safePassword = typeof password === 'string' ? password : '';

  if (!safeName || !safeEmail || !safePassword) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existingUser = await User.findOne({ email: safeEmail });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name: safeName, email: safeEmail, password: safePassword });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};

const loginUser = async (req, res) => {
  // This controller handles user login by verifying credentials and generating JWT.
  const { email, password } = req.body;
  const safeEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const safePassword = typeof password === 'string' ? password : '';

  if (!safeEmail || !safePassword) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: safeEmail });
  if (!user || !(await user.matchPassword(safePassword))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};

module.exports = { registerUser, loginUser };
