const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const doctorAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "not authorized person" });
    }
    const jwtdata = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!jwtdata) {
      return res.status(401).json({ message: "not authorized person" });
    }
    const doctor = await doctorModel.findOne({ _id: jwtdata.doctorId });
    if (!doctor) {
      return res.status(401).json({ message: "not authorized person" });
    } else {
      req.doctor = doctor;
      next();
    }
  } catch (error) {
    return res.status(404).json({ message: "Invalid token provided", error });
  }
};

module.exports = doctorAuth;
