const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routers
const userRouter = require('./routes/user.Routes.js');
const EventRouter = require('./routes/event.router.js');

// Config
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// Test route
app.get('/', (req, res) => {
    res.send("Hello Keshu");
});

// Use routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/event', EventRouter);

app.listen(3000, async (req, res) => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
        console.log("Server started at port 3000");
    } catch (err) {
        console.log("Something went wrong", err);
        process.exit();
    }
});
