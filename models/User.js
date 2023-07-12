const mongoose = require("mongoose");
const { isEmail } = require("validator");

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

    return mongoose.model("User", userSchema);
  }
}

module.exports = User.initialize();
