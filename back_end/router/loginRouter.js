import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";


const loginRouter = express.Router();

loginRouter.post("/login-user", loginUser);
loginRouter.post("/register-user", registerUser);

export default loginRouter;