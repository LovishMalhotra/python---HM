const express = require("express");
const {
  userStatus,
  checkout,
  paymentVerification,
  assignLead
} = require("../controllers/PaymentController.js");

const router = express.Router();

router
  .post("/checkout", checkout)
  .post("/paymentVerification", paymentVerification)
  .get("/status", userStatus)
  .post("/assignLead", assignLead);

exports.router = router;
