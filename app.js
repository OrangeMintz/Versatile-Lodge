const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authroute = require("./routes/auth.js");
const usersroute = require("./routes/users.js");
const roomsroute = require("./routes/rooms.js");
const branchroute = require("./routes/branch.js");
const cookieParser = require("cookie-parser");

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

//middlewares

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroute);
app.use("/api/users", usersroute);
app.use("/api/branch", branchroute);
app.use("/api/room", roomsroute);

//GOOGLE OAUTH
app.use("/oauth", oauthRouter);
app.use("/request", requestRouter);

app.get("/", (req, res) => {
  res.send("Route folder");
});

app.get("/user", (req, res) => {
  res.send([
    {
      id: 1,
      name: "John Doe",
      age: 32,
    },
    {
      id: 2,
      name: "Doe John",
      age: 35,
    },
  ]);
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
