require('dotenv').config();
require('express-async-errors');//to handle errors without try catch block

const express = require('express');
const { app , server} = require("./socket/socket");
const cors = require('cors');
const cookieParaser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:3000', //specifying the url to which the data is being sent to 
    credentials: true//specifying this to set cookies on the frontend
}));//using cors 

const notFoundMiddlware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const connectDB = require('./connectDB/connect');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
//Importing all required files 

app.use(express.json());//to be able to send json objects
app.use(cookieParaser());//to extract cookies from the browser

app.use('/api/auth', authRoutes);//route to signup and login
app.use('/api/messages', messageRoutes);//route to send and retrieve messages
app.use('/api/users', userRoutes);//route to send and retrieve messages
app.use(errorHandlerMiddleware);//route to handle all errors
app.use(notFoundMiddlware);//route to handle non-existent routes

const PORT = process.env.PORT || 3001;//setting up the backend port

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to MongoDB database');
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
//starting the server