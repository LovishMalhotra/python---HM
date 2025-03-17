const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");
const MongoStore = require("connect-mongo");

// import paymentRoute from "./routes/Payment.js";

const authRouters = require("./routes/Auth.js");
const jobRouters = require("./routes/Job.js");
const searchRouters = require("./routes/Search.js");
const queryRouters = require("./routes/Query.js");
const paymentRoute = require("./routes/Payment.js");

const RAZORPAY_API_KEY = "rzp_test_OZaIqhkK2kxE9F";
const RAZORPAY_API_SECRET = "PG3TkQ6Kwp6yOZkqJT3Xtl9M";

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_API_SECRET,
});

module.exports = instance;

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://client-kq9gg5smk-lovishmalhotras-projects.vercel.app/",
  })
);

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://lovishmalhotra2441:Lovish%402441@cluster0.ipj4yj6.mongodb.net/IMhometutor?retryWrites=true&w=majority"
    }) ,
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
    "mongodb+srv://lovishmalhotra2441:Lovish%402441@cluster0.ipj4yj6.mongodb.net/IMhometutor?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

module.exports = app;