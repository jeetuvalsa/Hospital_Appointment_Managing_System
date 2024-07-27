const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointedPatients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
  }],
  completedPatients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
  }],
});

module.exports = mongoose.model("doctor", doctorSchema);

