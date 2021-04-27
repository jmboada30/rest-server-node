const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');
const { User, Category, Product } = require('../models');

const collectionsAllowed = ['users', 'categories', 'products', 'roles'];

const searchUser = async (search = '', res = response) => {
  if (isValidObjectId(search)) {
    const user = await User.findById(search);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(search, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  return res.json({
    results: users,
  });
};

const searchCategory = async (search = '', res = response) => {
  if (isValidObjectId(search)) {
    const category = await Category.findById(search).populate('user', 'name');
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(search, 'i');

  const categories = await Category.find({ name: regex, state: true }).populate(
    'user',
    'name'
  );

  return res.json({
    results: categories,
  });
};

const searchProduct = async (search = '', res = response) => {
  if (isValidObjectId(search)) {
    const product = await Product.findById(search)
      .populate('category', 'name')
      .populate('user', 'name');
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(search, 'i');

  const products = await Product.find({
    $or: [{ name: regex }, { desc: regex }],
    $and: [{ state: true }],
  })
    .populate('category', 'name')
    .populate('user', 'name');

  return res.json({
    results: products,
  });
};

const search = (req = request, res = response) => {
  const { collection, search } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case 'users':
      searchUser(search, res);
      break;
    case 'categories':
      searchCategory(search, res);
      break;
    case 'products':
      searchProduct(search, res);
      break;

    default:
      return res.status(400).json({
        msg: `${collection} collection disabled`,
      });
      break;
  }
};

module.exports = {
  search,
};
