const { profile, profileUpdate, changePassword } = require("../controllers/profile.controller");
const express = require('express');
const AuthVerify = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get('/view',AuthVerify, profile);
profileRouter.patch('/edit',AuthVerify, profileUpdate);
profileRouter.patch('/changepassword',AuthVerify ,changePassword);
module.exports = profileRouter; 


