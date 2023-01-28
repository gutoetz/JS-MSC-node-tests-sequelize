const express = require("express");

const authLogin = require("../controllers/login.controllers");

const routers = express.Router();

routers.post("/", authLogin.auth);

module.exports = routers;
