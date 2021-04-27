const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate.middleware');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Debe enviar un email valido').isEmail(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
