const mongoose = require("mongoose");
const { format } = require("date-fns");

const postSchema = new mongoose.Schema({
  doctorImage: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  doctorDepartment: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
});

module.exports = mongoose.model("post", postSchema);
