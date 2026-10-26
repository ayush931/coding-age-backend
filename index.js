// const express = require("express"); older way
// 1st express is variable name and second one is the file from which the express is getting imported
import express from "express";
import { config } from "dotenv";
config()

const app = express();

app.get("/ping", (req, res) => {
    res.json({
        id: 1,
        data: "abcde"
    })
})


const PORT = process.env.PORT;

// http://localhost:4000/
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})