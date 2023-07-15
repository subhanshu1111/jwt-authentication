const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
class AuthController {
  //check if the error is a mongoose error

  handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };
    //duplicate error code
    if(err.code === 11000){
      errors.email = "that email is already registered";  
      return errors;
    }
    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  };
  maxAge = 3*24*60*60;
  createToken = (id)=>{
    return jwt.sign({id},'subhanshu secret',{
      expiresIn:this.maxAge
    })
  } 
  signup_get = (req, res) => {
    res.render("signup");
  };

  login_get = (req, res) => {
    res.render("login");
  };

  signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      const token = this.createToken(user._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:this.maxAge *1000})
      res.status(201).json({user:user._id});
    } catch (err) {
     const errors= this.handleErrors(err);
       
      res.status(400).json({ errors });
    }
  };


  login_post = async (req, res) => {
    try{
      const user = await User.login(email,password)

      res.status(200).json({user:user._id})  
    }catch(err){
      res.status(400).json({})
    }
  };
}
module.exports = AuthController;
