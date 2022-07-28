const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.js')
const { fieldValidator } = require('../middlewares/field-validator.js')

const router = Router()

router.post('/login', [
    check('email', 'The e-mail field is mandatory').isEmail(),
    check('password', 'The password is incorrect').not().isEmpty(),
    fieldValidator
], login);

module.exports = router