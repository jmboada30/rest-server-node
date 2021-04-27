const { request, response } = require('express');
const { Category } = require('../models');

const getAllCategories = async (req = request, res = response) => {
  const { limit = 5, page = 0 } = req.query;
  const [total, categories] = await Promise.all([
    Category.countDocuments({ state: true }),
    Category.find({ state: true })
      .populate('user', 'name')
      .skip(Number(page))
      .limit(Number(limit)),
  ]);

  res.json({ total, categories });
};

const getCategoryById = async (req = request, res = response) => {
  const id = req.params.id;
  const category = await Category.findById(id).populate('user', 'name');

  res.json(category);
};

const postCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const existCategory = await Category.findOne({ name });

  if (existCategory) {
    return res.status(400).json({
      msg: `La categoria ${name}, ya existe`,
    });
  }

  const data = {
    name,
    user: req.user_auth._id,
  };

  const category = new Category(data);
  await category.save();

  res.json(category);
};

const putCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const { state, user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user_auth._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const deleteCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(category);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
