import express from "express";
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.log(err);
});

const app = express();

// Allow to use JSON
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is Running Port 3000...");
})

// Routes Manage
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})