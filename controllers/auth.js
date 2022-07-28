const { response } = require("express");
const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const { tokenGenerator } = require("../helpers/jwt-generator.js");

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "User or password is incorrect - EMAIL"
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User or password is incorrect - STATUS: FALSE"
            })
        }

        const isValidPassword = bcryptjs.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                msg: "User or password is incorrect - PASSWORD"
            })
        }
        //Generate token
        const token = await tokenGenerator(user.id)

        res.json({
            response: 'Succesfully logged in',
            user,
            token
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }

}

module.exports = { login }   