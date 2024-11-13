import { Router } from "express";
import { signup,login } from "../controllers/AuthController.js";

//instance of router class // thisnwill be used to define the routes to authenticate such as /signup and /login etc
const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)

export default authRoutes