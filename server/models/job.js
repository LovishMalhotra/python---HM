const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  studentName: { type: String, required: true },
  area: { type: String, required: true },
  classTitle: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  timings: { type: String, required: true },
  subject: { type: [String] },
  fees: { type: Number, required: true },
  mode: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String },
  contact: { type: String, required: true },
  password: { type: String, required: true },
});

exports.Job = mongoose.model("Job", jobSchema);
