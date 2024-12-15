const express = require('express');
const { feed } = require('../controllers/user.controller');
const AuthVerify = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.get('/feed',AuthVerify , feed);
module.exports = userRouter;  