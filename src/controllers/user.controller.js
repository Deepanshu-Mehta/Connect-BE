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

module.exports = {feed}
