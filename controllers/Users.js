const { request, response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs');

const getUsers = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query
    const query = { status: true }

    const [totalUsers, users] = await Promise.all([

        User.countDocuments(query),
        User
            .find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ totalUsers, users });
    res.end()
};

const putUsers = async (req, res) => {
    const { id } = req.params

    const { _id, password, google, ...newInfo } = req.body

    if (password) {
        //Ecrypt password
        const salt = bcrypt.genSaltSync()
        newInfo.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, newInfo)

    res.status(202).json(user)
    res.end()
}

const postUsers = async (req, res) => {

    const { name, mail, password, rol } = req.body
    const user = new User({
        name, mail, password, rol,
    })

    //Ecrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()
    res.status(201).json({
        user
    })

    res.end()
}

const deleteUsers = async (req, res) => {

    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { status: false })

    res.json({
        user
    });
    res.end();
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
}