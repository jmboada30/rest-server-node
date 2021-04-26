const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiVersion = process.env.API_VERSION || '/api/v1';

    // Conectar DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.usersPath = `${this.apiVersion}/users`;
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    });
  }
}

module.exports = Server;
