const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');


// const authroute = require("./routes/auth.js");
const roomsroute = require("./routes/rooms.js");
const bookhistoryroute = require("./routes/bookinghistory.js")
const receptionroute = require("./routes/receptionsRoutes.js");
const reviewsroute = require("./routes/reviews.js")
const customerroute = require('./routes/authRoutes.js')
const adminroute = require('./routes/adminRoutes.js')
const bookingroute = require('./routes/booking.js')
const oauthRouter = require("./routes/oauth.js");
const oauthRouter2 = require("./routes/oauth2.js");
const requestRouter = require("./routes/request.js");
const requestRouter2 = require("./routes/request2.js");

const testingRoutes = require("./routes/testingRoutes.js");

const cloudinary = require('cloudinary').v2;


const app = express();
dotenv.config();



const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.error("MongoDB Connection Error:", error); // Log the error
    process.exit(1); // Terminate the application on connection error
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});

//Middlewares
const { sendEmail } = require('./middleware/emailMiddleware.js'); // Import the email middleware
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.8.69:3001", "https://192.168.8.69:3001"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '50m' }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API's
app.use("/", customerroute);
app.use("/admin", adminroute);
app.use("/api/room", roomsroute);
app.use("/api/bookingHistory", bookhistoryroute);
app.use("/api/reviews", reviewsroute);
app.use("/api/reception", receptionroute);
app.use("/api/booking", bookingroute);
app.use("/api/testing", testingRoutes);


//GOOGLE OAUTH WITHOUT API's
// app.use("/oauth", oauthRouter);
app.use("/oauth", oauthRouter2);
// app.use("/request", requestRouter);
app.use("/request", requestRouter2);

app.get('/', (req, res) => {
  res.send('Welcome to your application!');
});


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(8000, () => {
  connect();
  console.log("Connected to Backend");
});
