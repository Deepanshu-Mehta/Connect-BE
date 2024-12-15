const express = require('express');
const { feed, connectionsReceived, connections } = require('../controllers/user.controller');
const AuthVerify = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.get('/feed',AuthVerify , feed);
userRouter.get('/connections',AuthVerify ,connections );
userRouter.get('/requests/received',AuthVerify ,connectionsReceived);
module.exports = userRouter;  