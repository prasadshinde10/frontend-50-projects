const Product = require('../models/Product');

const getProducts = async (req, res) => {
  // This controller returns the full product list for the home page.
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

const getProductById = async (req, res) => {
  // This controller returns one product so users can view detailed information.
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  // This controller allows admins to create products with clean and minimal input.
  const { name, price, description, image, countInStock } = req.body;

  const product = await Product.create({
    name,
    price,
    description,
    image,
    countInStock,
  });

  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  // This controller lets admins update product details while keeping data validation in the model.
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;
  product.description = req.body.description ?? product.description;
  product.image = req.body.image ?? product.image;
  product.countInStock = req.body.countInStock ?? product.countInStock;

  const updated = await product.save();
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  // This controller allows admins to remove products that are no longer available.
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
