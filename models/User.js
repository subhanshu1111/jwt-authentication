const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
class User {
   static initialize() {
    const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum required length is 6']
      },
    });
    // userSchema.post('save',function(doc,next){
    //   console.log("new user was created and saved",doc);
    //   next();
    // });
    userSchema.pre('save', async function(next){
      const salt =await bcrypt.genSalt();
      this.password =await bcrypt.hash(this.password,salt);
      next();
    })
   return mongoose.model("User", userSchema);
 }
}
// const User = mongoose.model("User", userSchema);

module.exports = User.initialize();
