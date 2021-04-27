const { request, response } = require('express');
const { Product } = require('../models');

const getAllProducts = async (req = request, res = response) => {
  const { limit = 5, page = 0 } = req.query;
  const [total, products] = await Promise.all([
    Product.countDocuments({ state: true }),
    Product.find({ state: true })
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(page))
      .limit(Number(limit)),
  ]);

  res.json({ total, products });
};

const getProductById = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findById(id)
    .populate('category', 'name')
    .populate('user', 'name');

  res.json(product);
};

const postProduct = async (req = request, res = response) => {
  const { name, ...data } = req.body;

  const existProduct = await Product.findOne({ name: name.toUpperCase() });

  if (existProduct) {
    return res.status(400).json({
      msg: `El producto ${name}, ya existe`,
    });
  }

  data.user = req.user_auth._id;
  data.name = name.toUpperCase();

  const product = new Product(data);
  await product.save();

  res.json(product);
};

const putProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const { state, user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user_auth._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
