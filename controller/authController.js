const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
class AuthController {
  //check if the error is a mongoose error

  handleErrors = (err) => {
    console.log(err.message, err.code);
    //print the error object outside the if condition
    // if(err.code === 11000){
    //     err.message = "Email already exists";
    // }
    if (err.message.includes("user validation failed")) {
      console.log(err); //doesnt work
    }
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
      res.cookie = ('jwt',token,{httpOnly:true,maxAge:this.maxAge *1000})
      res.status(201).json({user:user._id});
    } catch (err) {
      this.handleErrors(err);
      res.status(400).send(err.message);
    }
  };


  login_post = async (req, res) => {
    const { email, password } = req.body;
    res.send("new login");
    console.log(email);
  };
}
module.exports = AuthController;
