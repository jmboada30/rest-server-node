const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
  validateJWT,
  userIsAdmin,
  hasRoles,
} = require('../middlewares');

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const {
  validateRol,
  existEmail,
  existUserById,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Nombre obligatorio').not().isEmpty(),
    check('pass', 'Pass obligatorio y min 4 digitos').isLength({ min: 4 }),
    check('email', 'Email invalido').isEmail(),
    check('email').custom(existEmail),
    check('rol').custom(validateRol),
    validateFields,
  ],
  postUser
);

router.put(
  '/:id',
  [
    check('rol').custom(validateRol),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  putUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    // userIsAdmin,
    hasRoles('USER'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
