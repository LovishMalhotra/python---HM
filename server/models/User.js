const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subscription: {
    plan: { type: String }, // e.g., "basic" or "premium"
    maxLeads: { type: Number },
    usedLeads: { type: Number, default: 0 },
    appliedJobs: [{ type: String }],
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: false }
  }
});

exports.User = mongoose.model("User", userSchema);
