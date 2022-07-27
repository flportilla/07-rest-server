const { Router } = require('express')
const { check } = require('express-validator')

const { isValidRol, isEmailDuplicated, isExistingUser } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/fieldValidator');

const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}
    = require('../controllers/Users');

const router = Router()

router.get('/', getUsers);

router.put('/:id',
    [
        check('id').custom(isExistingUser),
        check('rol').custom(isValidRol),
        fieldValidator
    ],
    putUsers);

router.post('/',
    [
        // check('rol', 'Is not a valid rol').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('name', 'Name is mandatory').not().isEmpty(),
        check('password', 'Password is mandatory and longer that 5 characters').isLength({ min: 5 }),
        check('mail', 'Invalid email').isEmail(),
        check('mail').custom(isEmailDuplicated),
        check('rol').custom(isValidRol),
        fieldValidator
    ],
    postUsers);

router.delete('/:id',
    [
        check('id').custom(isExistingUser),
        fieldValidator
    ],
    deleteUsers);

module.exports = router;