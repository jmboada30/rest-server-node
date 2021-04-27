const { request, response } = require('express');

const User = require('../models/users');
const { hashPass } = require('../helpers/bcrypt');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const postUser = async (req = request, res = response) => {
  const { name, email, pass, rol } = req.body;
  const user = new User({ name, email, pass, rol });

  // Encriptar Pass
  user.pass = hashPass(pass);

  // guardar
  await user.save();

  res.json(user);
};

const putUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, pass, google, correo, ...data } = req.body;

  if (pass) data.pass = hashPass(pass);

  const user = await User.findByIdAndUpdate(id, data);

  res.json(user);
};

const deleteUser = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
