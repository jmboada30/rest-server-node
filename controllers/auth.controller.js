const { request, response } = require('express');
const { vericatePass } = require('../helpers/bcrypt');
const { generateJWT } = require('../helpers/jwt');

const User = require('../models/users');

const login = async (req = request, res = response) => {
  const { email, pass } = req.body;

  try {
    // Verificar si existe el email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Datos invalidos - email',
      });
    }

    // usuario activo?
    if (!user.state) {
      return res.status(400).json({
        msg: 'Datos invalidos - state',
      });
    }

    // verificar pass
    if (!vericatePass(pass, user.pass)) {
      return res.status(400).json({
        msg: 'Datos invalidos - pass',
      });
    }

    // generar token
    const token = await generateJWT(user._id);

    res.json({ user, token });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({
      msg: 'Comuniquese con el Departamento tecnico',
    });
  }
};

module.exports = {
  login,
};
