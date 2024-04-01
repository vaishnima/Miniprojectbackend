const express = require ("express");
const { login } = require("../Controller/userController");

const route = express.Router()
route.post('/login', login);
module.exports=route;