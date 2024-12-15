const { feed, getUserbyEmail, updateUser, deleteUser, profile } = require("../controllers/user.controller");
const express = require('express');
const AuthVerify = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.get('/feed',AuthVerify, feed);
userRouter.get('/profile',AuthVerify, profile);
userRouter.get('/userId/:email',AuthVerify ,getUserbyEmail);
userRouter.patch('/updateProfile/:id',AuthVerify ,updateUser);
userRouter.delete('/deleteUser/:id',AuthVerify ,deleteUser);
module.exports = userRouter; 


