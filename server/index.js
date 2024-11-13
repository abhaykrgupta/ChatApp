// const express = require("express");  // CommonJS

import express from "express"; //ES module
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./utils/db.js";
import authRoutes from "./routes/AuthRoute.js";


dotenv.config();


// connection with database
const LoadDB = async() =>{
    await ConnectDB();
}
LoadDB();

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares for cros origin connection 
app.use(
    cors({
            origin: [process.env.ORIGIN],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,  //it enables cookies 
        })
)
//cookies parser middleware to getting the cookies from frontend 
app.use(cookieParser())

// For parsing JSON bodies
app.use(express.json()); 

//
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
