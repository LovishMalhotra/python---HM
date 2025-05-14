const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");
const MongoStore = require("connect-mongo");



require('dotenv').config();

// import paymentRoute from "./routes/Payment.js";

const authRouters = require("./routes/Auth.js");
const jobRouters = require("./routes/Job.js");
const searchRouters = require("./routes/Search.js");
const queryRouters = require("./routes/Query.js");
const paymentRoute = require("./routes/Payment.js");

const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;
const RAZORPAY_API_SECRET = process.env.RAZORPAY_API_SECRET;

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_API_SECRET,
});

module.exports = instance;

const app = express();

const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
// const allowedOrigins = [
//   "http://localhost:3000", // For local testing
//   "https://client-one-beige.vercel.app",
//   "https://client-1tq5fosm5-lovishmalhotras-projects.vercel.app" // Your deployed client
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
//   })
// );
app.use(cors({ origin: "*", credentials: true }));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB
    }),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.get("/get-session-id", (req, res) => {
  if (req.session) {
    const sessionId = req.sessionID;
    const userId = req.session.user;
    console.log(userId);
    res.json({ sessionId, userId });
  } else {
    res.status(404).send("Session not found");
  }
});

app.use("/auth", authRouters.router);
app.use("/jobs", jobRouters.router);
app.use("/search", searchRouters.router);
app.use("/query", queryRouters.router);
app.use("/payment", paymentRoute.router);

app.get("/payment/getKey", (req, res) =>
  res.status(200).json({ key: RAZORPAY_API_KEY })
);

//Database connection
main().catch((err) => console.log(`Unable to connect ${err}`));
async function main() {
  await mongoose.connect(
    process.env.MONGODB
  );
  console.log("Database Connected");
}

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

module.exports = app;
