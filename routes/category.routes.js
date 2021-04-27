const { Router } = require('express');
const { check } = require('express-validator');
const { existCategoryById } = require('../helpers/db-validators');
const { validateJWT, validateFields, userIsAdmin } = require('../middlewares');

const {
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const router = Router();

// cualquiera - publico
router.get('/', getAllCategories);

// cualquiera por id de categoria - publico
router.get(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  getCategoryById
);

// Cualquier user Con token valido
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  postCategory
);

// Cualquier user Con token valido
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  putCategory
);

// Solo el admin
router.delete(
  '/:id',
  [
    validateJWT,
    userIsAdmin,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
