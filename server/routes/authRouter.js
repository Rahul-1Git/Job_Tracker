import express from "express";
import {
  signupValidation,
  loginValidation,
} from "../middleware/authController.js";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

//POST
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
