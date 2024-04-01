const express = require ("express");
const { signup, login } = require("../Controller/userController");

const route = express.Router()
route.post('/signup', signup);
route.post('/login', login);
module.exports=route;