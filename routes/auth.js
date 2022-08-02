const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidator, validateJWT } = require('../middlewares')

const { login, googleSingIn, renewToken } = require('../controllers')

const router = Router()

router.post('/login', [
    check('email', 'The e-mail field is mandatory').isEmail(),
    check('password', 'The password is incorrect').not().isEmpty(),
    fieldValidator
], login);

router.post('/google', [
    check('id_token', 'The id_token is mandatory').not().isEmpty(),
    fieldValidator
], googleSingIn);

router.get('/', validateJWT, renewToken)

module.exports = router
