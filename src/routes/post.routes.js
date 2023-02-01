const express = require('express');

const authToken = require('../middlewares/tokenAuth.middlewares');
const postControllers = require('../controllers/post.controllers');

const routers = express.Router();

routers.post('/', authToken, postControllers.createPost);
routers.get('/search', authToken, postControllers.searchQuery);
routers.get('/', authToken, postControllers.getAllPosts);
routers.get('/:id', authToken, postControllers.getPostById);
routers.put('/:id', authToken, postControllers.attPost);
routers.delete('/:id', authToken, postControllers.deletePost);

module.exports = routers;