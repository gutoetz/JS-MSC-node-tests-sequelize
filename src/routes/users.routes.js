const express = require('express');

const userControllers = require('../controllers/users.controllers');
const authToken = require('../middlewares/tokenAuth.middlewares');
const newUserValidate = require('../middlewares/users.middlewares');

const routers = express.Router();

routers.post('/', newUserValidate, userControllers.createUser);
routers.get('/', authToken, userControllers.getAll);
routers.get('/:id', authToken, userControllers.getUSerById);

module.exports = routers;
