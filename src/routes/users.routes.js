const express = require("express");

const userControllers = require("../controllers/users.controllers");
const newUserValidate = require("../middlewares/users.middlewares")

const routers = express.Router();

routers.post("/", newUserValidate, userControllers.createUser);

module.exports = routers;
