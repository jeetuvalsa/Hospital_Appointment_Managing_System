const mongoose = require("mongoose");

const appointedPatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  tokenNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["waiting", "in room", "completed"],
    default: "waiting",
  },
});

module.exports = mongoose.model("appointment", appointedPatientSchema);
