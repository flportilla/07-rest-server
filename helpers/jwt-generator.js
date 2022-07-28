const jwt = require('jsonwebtoken')
const secret = `${process.env.SECRETORPRIVATEKEY}`

//Generate a JWT
const tokenGenerator = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, secret, {
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

module.exports = {
    tokenGenerator
}