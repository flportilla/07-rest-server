const Rol = require('../models/rol')
const User = require('../models/user')
const { Types } = require('mongoose')

//Check if the rol is in DB
const isValidRol = async (rol = '') => {
  if (rol) {
    const isRol = await Rol.findOne({ rol })
    if (!isRol) throw new Error(`The role ${rol} is not registered in the DB`)
  }
}

//Check for duplicated emails
const isEmailDuplicated = async (mail = '') => {
  const email = await User.findOne({ mail })
  if (email) {
    throw new Error(`The email: ${mail} is already in use`)
  }
}

//Check if exist user with ID
const isExistingUser = async (id = '') => {

  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`This isn't a valid Mongoose ID`);
  }

  const existingUser = await User.findById(id)
  if (!existingUser) {
    throw new Error(`The user with the id: ${id} doesn't exist on DB`)
  }
}

module.exports = {
  isValidRol,
  isEmailDuplicated,
  isExistingUser
}