import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "SignUp SuccessFully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
       error: error.message,     // Shows the error message
       stack: error.stack, 
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User is not exist, email  is wrong",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "User is not exist, password is wrong",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "login  successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
       error: error.message,     // Shows the error message
      stack: error.stack, 
    });
  }
};

export { signup, login };

// ✅ Signup Flow
// Checks if the user exists

// Hashes password with bcrypt

// Saves the new user

// Sends proper response

// ✅ Login Flow
// Finds user by email

// Compares hashed password

// Generates JWT

// Sends token + basic info in response
