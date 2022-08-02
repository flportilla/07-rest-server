require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//Generate a JWT
const tokenGenerator = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err)
                reject("It wasn't possible to generate the token");
            }
            else {
                resolve(token)
            }
        })
    })
}

const verifyJWT = async (token = '') => {

    try {

        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(uid)
        if (user) {
            if (user.status) {

                return user
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }


    } catch (error) {
        return null;
    }

}



module.exports = {
    tokenGenerator,
    verifyJWT
}