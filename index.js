// const express = require("express"); older way
// 1st express is variable name and second one is the file from which the express is getting imported
import express from "express";
import "dotenv/config"
import databaseConnection from "./database/dbConnection.js";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT;

app.use("/api/v1/user", userRouter)

// http://localhost:8000/api/v1/user
app.listen(PORT, async () => {
    await databaseConnection()
    console.log(`App is running on ${PORT}`)
})