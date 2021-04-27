const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_PRIVATE_KEY;

const optionsToken = {
  expiresIn: '4h',
};

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, secretKey, optionsToken, (err, token) => {
      if (err) reject('No se pudo generar el token');
      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
};
