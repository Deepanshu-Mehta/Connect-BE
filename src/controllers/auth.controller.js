const User = require('../models/users.models');

const signup = async (req,res)=>{
    try {
        const { firstName, lastName, email, password, age, gender } = req.body;
    
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
        });
    
        await newUser.save();
    
        res.send('User created');
      } catch (error) {
        console.error('Error creating user document:', error);
        res.status(500).send('Error creating user document');
      }
    
}
const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
    
        if (isPasswordValid) {
          const token = await user.getJWT();
    
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
          });
          res.send(user);
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
}
const logout = async (req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.send("Logout Successful!!");

}
module.exports = {signup, login, logout};