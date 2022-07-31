const validateFields = require('../middlewares/field-validator.js')
const validateJWT = require('../middlewares/validate-jtw.js')
const validateRoles = require('../middlewares/validate-role.js')
const validateCategory = require('../middlewares/validate-category')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateCategory
}