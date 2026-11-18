import mongoose from "mongoose";
import CodingAgeError from "../utils/err.util.js";

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    new CodingAgeError(500, "URI is required")
    process.exit(1)
}

const databaseConnection = async () => {
    try {
        const { connection } = await mongoose.connect(MONGO_URI);

        if (connection) {
            console.log(`DB connected: ${connection.host}`)
        }
    } catch (error) {
        new CodingAgeError(500, "DB connection failed: ", error)
        process.exit(1)
    }
}

export default databaseConnection