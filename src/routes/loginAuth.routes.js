const express = require('express');

const loginMiddleware = require('../middlewares/LoginAuth.middlewares');
const controllersLogin = require('../controllers/login.controllers');

const routers = express.Router();

routers.post('/', loginMiddleware, controllersLogin.auth);

module.exports = routers;
