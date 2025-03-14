const crypto = require("crypto");
const Razorpay = require("razorpay");
const { Payment } = require("../models/payment.js");
const { User } = require("../models/User.js");
const { subscribe } = require("diagnostics_channel");

const RAZORPAY_API_KEY = "rzp_test_OZaIqhkK2kxE9F";
const RAZORPAY_API_SECRET = "PG3TkQ6Kwp6yOZkqJT3Xtl9M";

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_API_SECRET,
});

/**
 * Checkout endpoint:
 * Validates the plan details (amount and plan) sent by the frontend.
 * Creates an order with Razorpay.
 */
exports.checkout = async (req, res) => {
  const { amount, plan } = req.body;

  // Define your plan details (you can move this object to a config file)
  const plans = {
    basic: { amount: 299, maxLeads: 4, validityDays: 60 }, // 2 months validity
    standard: { amount: 499, maxLeads: 8, validityDays: 120 }, // 4 months validity
    enterprise: { amount: 999, maxLeads: 20, validityDays: 180 } // 6 months validity
  };

  // Validate plan and amount
  if (!plans[plan] || plans[plan].amount !== amount) {
    return res.status(400).json({
      success: false,
      message: "Plan and amount mismatch",
    });
  }

  const options = {
    amount: amount * 100, // convert to paise
    currency: "INR",
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/**
 * Payment verification endpoint:
 * Validates the payment signature from Razorpay.
 * If valid, it updates the user's subscription with the selected plan details.
 */
exports.paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = req.body;

    // Construct the signature string and compute expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Define plan details (ensure these match your checkout validation)
    const plans = {
      basic: { maxLeads: 4, validityDays: 60 },
      standard: { maxLeads: 8, validityDays: 120 },
      enterprise: { maxLeads: 20, validityDays: 180 }
    };

    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    // Calculate subscription expiry date
    const expiresAt = new Date(Date.now() + selectedPlan.validityDays * 24 * 60 * 60 * 1000);

    // Update user's subscription information (ensure req.session.user contains a valid user ID)
    await User.findByIdAndUpdate(req.session.user, {
      subscription: {
        plan,
        maxLeads: selectedPlan.maxLeads,
        usedLeads: 0, // reset used leads on new subscription
        expiresAt,
        isActive: true,
      },
    });

    // Create a payment record
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return res.status(200).json({
      success: true,
      message: "Payment successful and subscription activated",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
};

/**
 * User status endpoint:
 * Returns the active subscription status of the user.
 */
exports.userStatus = async (req, res) => {
  if (req.session && req.session.user) {
    const userId = req.session.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ hasPaid: user.subscription ? user.subscription.isActive : false });
  } else {
    res.status(401).json({ message: "User not logged in" });
  }
};

/**
 * assignLead endpoint:
 * Checks if the user has an active subscription, validates if the lead limit is reached,
 * and then increments the usedLeads count atomically.
 */
exports.assignLead = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.session.user;

    // Fetch the user
    const user = await User.findById(userId);
    if (new Date() > new Date(user.subscription.expiresAt)) {
      return res.status(400).json({ success: false, message: "Subscription has expired" });
    }

    // Check if the lead limit is reached
    if (user.subscription.usedLeads >= user.subscription.maxLeads) {
      return res.status(400).json({ success: false, message: "Lead limit reached" });
    }

    if (!user || !user.subscription || !user.subscription.isActive) {
      return res.status(400).json({ success: false, message: "No active subscription found" });
    }

    // Atomically increment usedLeads and store the jobId in appliedJobs
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { "subscription.usedLeads": 1 },
        $push: { "subscription.appliedJobs": jobId }, // Store applied jobId
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      remainingLeads: updatedUser.subscription.maxLeads - updatedUser.subscription.usedLeads,
    });
  } catch (error) {
    console.error("Error assigning lead:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign lead",
      error: error.message,
    });
  }
};
