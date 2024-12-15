const validator = require('validator')
const validateSignup = (req)=>{
   const {firstName, lastName, email, password} = req.body;
   if(!firstName){
    throw new Error("Name is not Valid");
    }
    if(!lastName){
        throw new Error("Name is not Valid");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not Valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Valid");
    }

}

const validateLogin = (req) => {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (!password || password.trim() === "") {
      throw new Error("Password cannot be empty");
    }
  };
module.exports = {validateSignup, validateLogin};  