const User = require('../models/users.models.js');
const {validateSignup, validateLogin} = require('../utils/validators');
const bcrypt = require('bcrypt');
const signup = async (req,res)=>{
    try {
      //Data Validation
        validateSignup(req);

      const { firstName, lastName, email, password } = req.body;

      //Password Encryption
      const hashedPassword = await bcrypt.hash(password, 10);
      //Create a new user
        const newUser = new User({
          firstName,
          lastName,
          email,
          password : hashedPassword
        });
    
        await newUser.save();
    
        res.send('User created');
      } catch (error) {
        console.error('Error creating user document:', error);
        res.status(500).send('Error creating user document'+ error);
      }
    
}
const login = async(req,res)=>{
    try {
        //validate Input
        validateLogin(req);
        const {email, password} = req.body; 
        const user = await User.findOne({email});
        if (!user) {
          throw new Error("Invalid credentials");
        }
        //compare Password
        const isPasswordValid = await user.validatePassword(password);
    
        if (isPasswordValid) {
          const token = await user.getJWT()
    
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
          }).send(user);
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        console.error('Error logging in user:', err);
        res.status(400).send("ERROR : " + err.message);
      }
}
const logout = async (req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
      }).send("Logout Successful!!");

}
module.exports = {signup, login, logout};