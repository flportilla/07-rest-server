const validateFields = require('../middlewares/field-validator');
const validateJWT = require('../middlewares/validate-jtw');
const validateRoles = require('../middlewares/validate-role');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}