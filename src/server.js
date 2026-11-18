import app from './app.js';
import databaseConnection from './config/dbConnection.js';

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await databaseConnection()
    console.log(`App is running on ${PORT}`)
})