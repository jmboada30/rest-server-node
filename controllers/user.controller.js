const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  const { page = '1', limit = '10' } = req.query;
  res.json({
    message: 'get API - Controller',
    page,
    limit,
  });
};

const postUser = (req = request, res = response) => {
  const body = req.body;
  res.json({
    message: 'post API - Controller',
    body,
  });
};

const putUser = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: 'put API - Controller',
    id,
  });
};

const deleteUser = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: 'delete API - Controller',
    id,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
