const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(400).json({
      msg: 'No envio el Token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const userAuth = await User.findById(uid);

    if (!userAuth) {
      return res.status(401).json({
        msg: 'Token invalido - usuario fue borrado de la BD',
      });
    }

    if (!userAuth.state) {
      return res.status(401).json({
        msg: 'Token invalido - usuario inactivo',
      });
    }

    req.user_auth = userAuth;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token invalido',
    });
  }
};

module.exports = {
  validateJWT,
};
