require('dotenv').config();

const Server = require('./models/server');

const server = new Server(process.env.API_VERSION);

server.listen();
