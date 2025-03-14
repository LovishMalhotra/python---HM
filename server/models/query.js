const mongoose = require("mongoose");
const { Schema } = mongoose;

const querySchema = new Schema({
  contact: { type: Number, required: true },
});

exports.Query = mongoose.model("query", querySchema);
