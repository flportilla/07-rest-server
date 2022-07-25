const { request, response } = require('express')

const getUsers = (req = request, res = response) => {

  const { apikey } = req.query

  res.json({
    "msg": "get API - Controller",
    apikey
  })
  res.end()
};

const putUsers = (req, res) => {
  const { id } = req.params
  res.status(202).json({
    "msg": "put API - Controller",
    id
  })
  res.end()
}

const postUsers = (req, res) => {

  const { name, age } = req.body

  res.status(201).json({
    "msg": "post API - Controller",
    name,
    age
  })
  res.end()
}

const deleteUsers = (req, res) => {
  res.status(204).json({
    "msg": "delete API - Controller"
  })
  res.end()
}

const patchUsers = (req, res) => {
  res.status(201).json({
    "msg": "patch API"
  })
  res.end()
}

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers
}