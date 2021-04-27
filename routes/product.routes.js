const { Router } = require('express');
const { check } = require('express-validator');
const { existProductById } = require('../helpers/db-validators');
const { validateJWT, validateFields, userIsAdmin } = require('../middlewares');

const {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const router = Router();

// cualquiera - publico
router.get('/', getAllProducts);

// cualquiera por id de categoria - publico
router.get(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  getProductById
);

// Cualquier user Con token valido
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  postProduct
);

// Cualquier user Con token valido
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  putProduct
);

// Solo el admin
router.delete(
  '/:id',
  [
    validateJWT,
    userIsAdmin,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
