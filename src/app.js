import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import userRouter from './routers/user.router.js';
import cookieParser from 'cookie-parser';
config()

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// http://localhost:8000/api/v1/user/register
app.use("/api/v1/user", userRouter)

app.use(errorMiddleware)

export default app;