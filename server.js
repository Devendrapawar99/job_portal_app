//import express
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import colors from 'colors';
import connectDB from "./config/db.js";
import morgan from "morgan";

//Import Routes
import testRoute from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//dot env configure
dotenv.config();

//mongodb config
connectDB();

//rest object
const app = express();


//Middleware 
app.use(express.json());
app.use(morgan("dev"));


//routes:
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);


//Error middleware
app.use(errorMiddleware);


//listen: 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgMagenta.brightWhite);
});