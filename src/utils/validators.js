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

const validateProfileData = (req)=>{
  try{
    const ALLOWED_FIELDS = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills", "github", "linkedin"];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      ALLOWED_FIELDS.includes(field)
    );
    if(!isEditAllowed){
      throw new Error("Invalid Field");
      }
    // if(firstName.lenght < 3 || age <18 || !gender in ["Male", "Female", "Other", "male", "female", "other"] || !validator.isURL || about)
  
    return isEditAllowed;
  }catch(err){
    throw new Error("Invalid Update Request");
  }
  
    
}

const validatePassword=(newPassword)=>{
  return validator.isStrongPassword(newPassword);
}
module.exports = {validateSignup, validateLogin, validateProfileData, validatePassword};  