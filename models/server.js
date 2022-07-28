const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth'
        this.usersPath = '/api/users'
        this.URI = process.env.MONGO_URI

        //Connect to DB
        this.dbConnection()

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //JSON parse on body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/Auth'))
        this.app.use(this.usersPath, require('../routes/Users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        })
    }

    dbConnection() {
        dbConnect(this.URI)
    }
}

module.exports = Server