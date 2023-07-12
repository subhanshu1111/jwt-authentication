const User = require("../models/User")
class AuthController {
   
    handleErrors = (err)=>{
        console.log(err.message,err.code)
    }
 signup_get=(req,res)=>{
    res.render("signup")
}


login_get =(req,res)=>{
    res.render("login")
}

signup_post= async (req,res) => {
    
    const {email,password} = req.body
    try{
        const user = await User.create({email,password})
        res.status(201).json(user);
    }catch(err){
            this.handleErrors(err)
            res.status(400).send("Error, user not created")
    }
}

 login_post = async (req,res)=>{
    const {email,password} = req.body
    res.send("new login")
    console.log(email)
}
 
}
module.exports = AuthController;