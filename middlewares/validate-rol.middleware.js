const { response } = require('express');

const userIsAdmin = (req, res = response, next) => {
  if (!req.user_auth) {
    return res.status(500).json({
      msg: 'Se requiere validar primero el JWT',
    });
  }

  const { rol, name } = req.user_auth;
  if (rol !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} no es ADMIN`,
    });
  }

  next();
};

const hasRoles = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user_auth) {
      return res.status(500).json({
        msg: 'Se requiere validar primero el JWT',
      });
    }

    if (!roles.includes(req.user_auth.rol)) {
      return res.status(401).json({
        msg: `No tiene acceso a este recurso`,
      });
    }

    next();
  };
};

module.exports = {
  userIsAdmin,
  hasRoles,
};
