const { Role, User, Category, Product } = require('../models');

const validateRol = async (rol = '') => {
  const existRol = await Role.findOne({ name: rol });
  if (!existRol) {
    throw new Error(`El rol ${rol}, no es valido`);
  }
};

// validar correo unico
const existEmail = async (email = '') => {
  if (await User.findOne({ email }))
    throw new Error('El Email ya está registrado');
};

const existUserById = async (id) => {
  if (!(await User.findById(id))) throw new Error('El User id no existe');
};

const existCategoryById = async (id) => {
  if (!(await Category.findById(id)))
    throw new Error('El Category id no existe');
};

const existProductById = async (id) => {
  if (!(await Product.findById(id))) throw new Error('El Product id no existe');
};

module.exports = {
  validateRol,
  existEmail,
  existUserById,
  existCategoryById,
  existProductById,
};
