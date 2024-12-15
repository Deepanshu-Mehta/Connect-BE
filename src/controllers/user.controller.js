//get users profile 
const profile = (req,res)=>{
    try{
        const user = req.user;
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err});
    }
}

// Feed API -> get all the users from db
const User = require('../models/users.models');
const feed = async(req,res)=>{
    try{
        const users = await User.find();
        res.json(users);

    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error fetching users"});
    }
}

//get user by email

const getUserbyEmail = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.params.email});
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            res.json(user);
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Error fetching user"});
    }
}

//delete user by id
const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            res.json(user);
            }
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error deleting user"});
    }
}

//update user of user
const updateUser = async(req,res)=>{
    try{
        const ALLOWED_UPDATES = ["password", "age", "photoUrl", "about", "skills"];
        const isvalidAllowed = Object.keys(req.body).every(update => ALLOWED_UPDATES.includes(update));
        if(!isvalidAllowed){
            throw new Error("Updates not Allowed for certain things");
        }else{

            const user = await User.findByIdAndUpdate(req.params.id,req.body,
                {runValidators : true, returnDocument : 'after'});
            if(!user){
                throw new Error("User not found");
            }else{
                res.json(user);
            }}
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error updating user" + err.message});
    }
}


module.exports = {getUserbyEmail, feed, deleteUser, updateUser, profile}