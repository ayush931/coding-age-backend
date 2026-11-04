import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.log("MONGO_URI is missing")
}

async function databaseConnection() {
    try {
        const { connection } = await mongoose.connect(MONGO_URI)
        if (connection) {
            console.log("MONGODB connected", connection.host)
        }
    } catch (error) {
        console.log("Database server error: ", error)
        process.exit()
    }
}

export default databaseConnection