const {mongoose,  Schema} = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength : 3,
        maxLength : 20
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase : true,
        trim : true ,
        validate(value){
            if(!validator.isEmail){
                throw new Error('Invalid Email address '+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim : true,
        validate(value){
            if(!validator.isStrongPassword){
                throw new Error('Password should be strong'+ value);
            }
        }
    },
    age : {
        type: Number,
        min : 18,
    },
    gender : {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{values} is not a valid gender type`
            },
        lowercase: true
    },
    photoUrl : {
        type: String,
        default : "https://rizviarchitecture.edu.in/wp-content/uploads/2023/12/team-dummy.jpeg",
        validate(value){
            if(!validator.isURL){
                throw new Error('Invalid URL '+ value);
            }
        }
    },
    about : {
        type: String,
        default : "No description",
        maxLength : 200,
        trim : true,
    },
    skills : {
        type: [String],
        default : [],
        maxLength : 10,
        trim : true
    },
    github: {
        type: String,
        default : "https://github.com/"
    },
    linkedin: {
        type: String,
        default : "https://www.linkedin.com/"
    }

}, {timestamps : true});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id}, process.env.JWT_SECRET);
    return token;

}
userSchema.methods.validatePassword = async function(passwordByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);
    return isPasswordValid;

}
module.exports = mongoose.model('User', userSchema);