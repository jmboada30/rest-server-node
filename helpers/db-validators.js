const Role = require('../models/role');
const User = require('../models/users');

const validateRol = async (rol = '') => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol}, no es valido`);
  }
};

// validar correo unico
const existEmail = async (email = '') => {
  if (await User.findOne({ email }))
    throw new Error('El correo ya está registrado');
};

const existUserById = async (id) => {
  if (!(await User.findById(id))) throw new Error('El id no existe');
};

module.exports = {
  validateRol,
  existEmail,
  existUserById,
};
