const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authroute = require('./routes/auth.js');
const usersroute = require('./routes/users.js');
const roomsroute = require('./routes/rooms.js');
const hotelsroute = require('./routes/hotels.js');

const app = express();
dotenv.config();

const connect = async () => {

try {
  await mongoose.connect(process.env.MONGO);

} catch (error) {
    console.error('MongoDB Connection Error:', error); // Log the error
    process.exit(1); // Terminate the application on connection error
}};

mongoose.connection.on("disconnected", () => {
    console.log('MongoDB Disconnected')
})

mongoose.connection.on("connected", () => {
    console.log('Connected to MongoDB')
})

//middlewares
app.use(express.json());

app.use("/api/auth", authroute);
app.use("/api/users", usersroute);
app.use("/api/rooms", roomsroute);
app.use("/api/hotels", hotelsroute);

app.get("/", (req, res) => {
    res.send("Hello here's your first requests")
})

app.listen( 8000, () => {
    connect();
    console.log('Connected to Backend');
})

