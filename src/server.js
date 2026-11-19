import app from './app.js';
import databaseConnection from './config/dbConnection.js';
import cloudinary from "cloudinary";

const PORT = process.env.PORT;

// cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log(process.env.CLOUDINARY_CLOUD_NAME)

app.listen(PORT, async () => {
    await databaseConnection()
    console.log(`App is running on ${PORT}`)
})