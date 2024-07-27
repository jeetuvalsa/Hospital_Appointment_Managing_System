const jwt = require("jsonwebtoken");
const patientModel = require("../models/patientModel");
const patientAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "not authorized person" });
    }
    const jwtData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!jwtData) {
      return res.status(401).json({ message: "not authorized person" });
    }
    const patient = await patientModel.findOne({ _id: jwtData.patientId });
    if (!patient) {
      return res.status(401).json({ message: "not authorized person" });
    }
    req.patient = patient;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Invalid token", error });
  }
};

module.exports = patientAuth;
