// const express = require("express"); older way
// 1st express is variable name and second one is the file from which the express is getting imported
import express from "express";
import { config } from "dotenv";
config()

const app = express();
app.use(express.json())

app.get("/ping", (req, res) => {
    return res.json({
        id: 1,
        data: "abcde"
    })
})

// http://localhost:8000?name=ayush
app.post("/name", (req, res) => {
    const name = req.query.name;
    return res.json({
        name
    })
})

// http://localhost:8000/user/ayush
app.post("/user/:name", (req, res) => {
    const name = req.params.name;
    return res.json({
        name
    })
})

// http://localhost:8000/username
/**
 * {"name": "ayush"}
 */
app.post("/username", (req, res) => {
    const username = req.body.name
    return res.json({
        username: name
    })
})


const PORT = process.env.PORT;

// http://localhost:4000/
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})