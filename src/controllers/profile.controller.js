const User = require('../models/users.models');
const { validateProfileData, validatePassword } = require('../utils/validators');
//get users profile 
const profile = async(req,res)=>{
    try{
        const user = req.user;
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err});
    }
}

//edit/update profile
const profileUpdate = async(req,res)=>{
    try{
        const user = req.user;
        if(!validateProfileData(req.body)){
            return res.status(400).json({message:"Invalid data"});
        }
        Object.keys(req.body).forEach((key)=>user[key] = req.body[key]);
        await user.save();
        res.status(200).json({message : `${user.firstName}, your profile is updated Successfully`, data : user});

    }catch(err){
        res.status(404).json({message:err});
    }

}

//change password
const changePassword = async(req,res)=>{
    try{
        const user = req.user;
        const {oldPassword, newPassword} = req.body;


        const isValidPassword = await bcrypt.compare(oldPassword,user.password);
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid old password"});
            }
        if(!validatePassword(newPassword)){
            return res.status(400).json({message:"Invalid new password"});
            }
        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.status(200).json({message : `Password changed successfully for ${user.firstName}`});

    }
    catch(err){
        res.status(404).json({message:err});
    }
}

module.exports = { profile, profileUpdate, changePassword}