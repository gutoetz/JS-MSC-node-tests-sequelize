const express = require('express');

const categoryControllers = require('../controllers/category.controllers');
const authToken = require('../middlewares/tokenAuth.middlewares');

const routers = express.Router();

routers.post('/', authToken, categoryControllers.createCategory);
routers.get('/', authToken, categoryControllers.getAllCategories);

module.exports = routers;
