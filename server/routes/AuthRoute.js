import { Router } from "express";
import { signup, login, getUserInfo,updateProfile } from "../controllers/AuthController.js";
import { varifyToken } from "../middlewares/AuthMiddlewares.js";

//instance of router class // this will be used to define the routes to authenticate such as /signup and /login etc
const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", varifyToken, getUserInfo); // we have to varify the token before getting getUserInfo For this we will use authmiddlewares
authRoutes.post("/update-profile", varifyToken, updateProfile);
export default authRoutes;
