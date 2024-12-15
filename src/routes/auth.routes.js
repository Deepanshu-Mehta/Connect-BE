const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");
const AuthVerify = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout',AuthVerify ,logout);
module.exports = authRouter; 