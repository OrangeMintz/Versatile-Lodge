const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");



// const authroute = require("./routes/auth.js");
const usersroute = require("./routes/users.js");
const roomsroute = require("./routes/rooms.js");
const branchroute = require("./routes/branch.js");
const bookhistoryroute = require("./routes/bookinghistory.js")
const reviewsroute = require("./routes/reviews.js")
const transactionroute = require("./routes/transaction.js")
const customerroute = require('./routes/authRoutes.js')
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

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '50m' }))


// app.use("/api/auth", authroute);

// app.use("/api/users", usersroute);
app.use("/", customerroute);

// app.use('/', require('./routes/authRoutes'))
app.use("/api/branch", branchroute);
app.use("/api/room", roomsroute);
app.use("/api/bookingHistory", bookhistoryroute);
app.use("/api/reviews", reviewsroute);
app.use("/api/transaction", transactionroute);
app.use("/api/booking", bookingroute);


//GOOGLE OAUTH WITHOUT PASSPORT
app.use("/oauth", oauthRouter);
app.use("/request", requestRouter);

app.get("/", (req, res) => {
  res.send("Route folder");
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
