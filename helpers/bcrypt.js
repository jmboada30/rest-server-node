const bcryptjs = require('bcryptjs');

const hashPass = (pass = '') => {
  // Encriptar Pass
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(pass, salt);
};

const vericatePass = (passReceived, passDB) => {
  return bcryptjs.compareSync(passReceived, passDB);
};

module.exports = {
  hashPass,
  vericatePass,
};
