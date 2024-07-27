const express = require("express");
const {
  registerDoctor,
  loginDoctor,
  doctor,
  logoutDoctor,
  allAppointments,
  changeStatus,
  editDoctor,
  allDoctor,
  removeAppointment,
  allPatients,
  createPost,
  particularPatient,
  removePatient,
  removePost,
} = require("../controllers/doctorController");
const upload = require("../utils/multerConfig");
const { signupSchema, loginSchema } = require("../validators/doctorValidation");
const validate = require("../middlewares/validateMiddleware");
const doctorAuth = require("../middlewares/doctorAuthentication");

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validate(signupSchema),
  registerDoctor
);
router.post("/login", validate(loginSchema), loginDoctor);
router.get("/doctorOne", doctorAuth, doctor);
router.get("/logout", doctorAuth, logoutDoctor);
router.get("/all/appointment", doctorAuth, allAppointments);
router.get("/change/:appointmentId/:status", doctorAuth, changeStatus);
router.post("/edit", upload.single("image"), doctorAuth, editDoctor);
router.get("/all", doctorAuth, allDoctor);
router.get("/remove/appointment/:appointId", doctorAuth, removeAppointment);
router.get("/all/patients", doctorAuth, allPatients);
router.get("/patient/:patientId", doctorAuth, particularPatient);
router.get("/remove/patient/:patientId", doctorAuth, removePatient);
router.get("/post/remove/:postId", doctorAuth, removePost);
router.post(
  "/create/post/:PatientId",
  upload.single("image"),
  doctorAuth,
  createPost
);

module.exports = router;
