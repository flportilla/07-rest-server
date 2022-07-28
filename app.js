const Server = require('../07-rest-server/models/Server.js');

require('dotenv').config();

const server = new Server()

server.listen()