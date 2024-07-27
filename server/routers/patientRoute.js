const express = require("express");
const {
  registerPatient,
  loginPatient,
  patient,
  logoutPatient,
  AppointmentPatient,
  editpatient,
  allDoctorDetails,
  patientDetails,
} = require("../controllers/patientController");
const patientAuth = require("../middlewares/patientAuthentication");
const router = express.Router();

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.get("/patientOne", patientAuth, patient);
router.get("/logout", patientAuth, logoutPatient);
router.post("/create/appointment/:doctorId", patientAuth, AppointmentPatient);
router.post("/edit", patientAuth, editpatient);
router.get("/all/doctorDetails", patientAuth, allDoctorDetails);
router.get("/details", patientAuth, patientDetails);

module.exports = router;
