const bcryptjs = require('bcryptjs');

const hashPass = (pass = '') => {
  // Encriptar Pass
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(pass, salt);
};

module.exports = {
  hashPass,
};
