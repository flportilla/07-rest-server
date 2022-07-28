const Role = require('../models/Role.js')
const User = require('../models/User.js')
const { Types } = require('mongoose')

//Check if the role is in DB
const isValidRole = async (role = '') => {
  if (role) {
    const isRole = await Role.findOne({ role })
    if (!isRole) throw new Error(`The role ${role} is not registered in the DB`)
  }
}

//Check for duplicated emails
const isEmailDuplicated = async (email = '') => {
  const dupEmail = await User.findOne({ email })
  if (dupEmail) {
    throw new Error(`The email: ${dupEmail} is already in use`)
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
  isValidRole,
  isEmailDuplicated,
  isExistingUser
}
