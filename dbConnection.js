import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.log("MONGO_URI is missing")
}

function databaseConnection() {
    try {
        const connection = mongoose.connect(MONGO_URI)
        if (connection) {
            console.log("MONGODB connected")
        }
        else {
            console.log("Failed to connect MONGODB")
        }
    } catch (error) {
        console.log("Database server error: ", error)
    }
}

export default databaseConnection