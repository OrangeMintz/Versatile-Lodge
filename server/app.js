const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
const requestRouter = require("./routes/request.js");

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

//Middlewares
const { sendEmail } = require('./middleware/emailMiddleware.js'); // Import the email middleware
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
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

//GOOGLE OAUTH WITHOUT API's
app.use("/oauth", oauthRouter);
app.use("/request", requestRouter);


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


// NODEMAILER NOT FINISHED
// Example route that sends an email
// app.get('/send-email', async (req, res) => {
//   try {
//     // Replace 'test@email.com' with the recipient's email address
//     await sendEmail('test@email.com', 'Test Subject', 'Test Text', '<b>Test HTML</b>');
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



app.listen(8000, () => {
  connect();
  console.log("Connected to Backend");
});
