const { Router } = require('express');
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
