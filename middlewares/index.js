const validateFields = require('../middlewares/validate.middleware');
const validateJWT = require('../middlewares/validate-jwt.middleware');
const validateRoles = require('../middlewares/validate-rol.middleware');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};
