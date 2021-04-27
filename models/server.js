const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server {
  constructor(apiVersion) {
    this.app = express();
    this.port = process.env.PORT;

    // Routes
    this.paths = {
      auth: apiVersion + '/auth',
      categories: apiVersion + '/categories',
      products: apiVersion + '/products',
      users: apiVersion + '/users',
    };

    // Conectar DB
    this.connectDB();

    // Middlewares
    this.middlewares();

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
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.users, require('../routes/user.routes'));
    this.app.use(this.paths.categories, require('../routes/category.routes'));
    this.app.use(this.paths.products, require('../routes/product.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    });
  }
}

module.exports = Server;
