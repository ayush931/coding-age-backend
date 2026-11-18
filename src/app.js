import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
config()

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use(errorMiddleware)

export default app;