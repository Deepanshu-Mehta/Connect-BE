const { feed, getUserbyEmail, updateUser, deleteUser } = require("../controllers/user.controller");
const express = require('express');
const userRouter = express.Router();

userRouter.get('/feed',feed);
userRouter.get('/userId/:email', getUserbyEmail);
userRouter.patch('/updateProfile/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);
module.exports = userRouter; 


