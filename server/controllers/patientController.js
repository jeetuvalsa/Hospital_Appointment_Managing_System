const patientModel = require("../models/patientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

const registerPatient = async (req, res) => {
  const { name, mobileNumber, address, age, password } = req.body;
  try {
    const existPatient = await patientModel.findOne({ mobileNumber });
    if (existPatient) {
      return res.status(409).json({ message: "Patient already exist" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(401).json({ message: "something went wrong" });
      }
      const patient = await patientModel.create({
        name,
        mobileNumber,
        address,
        age,
        password: hash,
      });
      if (!patient) {
        return res
          .status(401)
          .json({ message: "something went wrong in creating patient" });
      }
      const token = await jwt.sign(
        { patientId: patient._id, mobileNumber: mobileNumber },
        process.env.JWT_SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .json({ message: "Patient Created Successfully", data: patient });
    });
  } catch (error) {
    return res.status(404).json({ message: "error in registerPatient", error });
  }
};
const loginPatient = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const patient = await patientModel.findOne({ mobileNumber });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    bcrypt.compare(password, patient.password, async (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      if (!result) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      const token = await jwt.sign(
        {
          patientId: patient._id,
          mobileNumber: patient.mobileNumber,
        },
        process.env.JWT_SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .json({ message: "Patient login successfully", data: patient });
    });
  } catch (error) {
    return res.status(500).json({ message: "error in login patient", error });
  }
};

const patient = async (req, res) => {
  try {
    const data = req.patient;
    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ message: "Patient Data", data });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Patient not found in catch block", error });
  }
};

const logoutPatient = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Patient logged out successfully" });
  } catch (error) {
    return res.status(404).json({ message: "error in logout catch" });
  }
};

const AppointmentPatient = async (req, res) => {
  const { doctorId } = req.params;
  const { name, mobileNumber, age } = req.body;
  try {
    const doctor = await doctorModel.findOne({ _id: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const lastAppointment =
      doctor.appointedPatients.length > 0
        ? await appointmentModel.findById(
            doctor.appointedPatients[doctor.appointedPatients.length - 1]
          )
        : null;

    // Determine the new token number
    const newTokenNo = lastAppointment
      ? parseInt(lastAppointment.tokenNo, 10) + 1
      : 1;
    const newAppointment = await appointmentModel.create({
      name,
      mobileNumber,
      age,
      tokenNo: newTokenNo.toString(),
      doctorId: doctor._id,
    });
    if (!newAppointment) {
      return res
        .status(401)
        .json({ message: "something went wrong in creating appointment" });
    }
    await newAppointment.save();

    doctor.appointedPatients.push(newAppointment._id);
    await doctor.save();
    return res.status(200).json({ message: "Appointment is created" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in appointment catch block", error });
  }
};

const editpatient = async (req, res) => {
  const data = req.patient;
  const { name, mobileNumber, address, age, password } = req.body;
  try {
    const patient = await patientModel.findOne({ _id: data._id });
    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }
    bcrypt.hash(password, 10, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ message: "Error in Edit password", err });
      }
      patient.name = name;
      patient.mobileNumber = mobileNumber;
      patient.address = address;
      patient.age = age;
      patient.password = hashed;
      await patient.save();
      return res
        .status(200)
        .json({ message: "Successfully updated the profile", data: patient });
    });
  } catch (error) {
    return res.status(404).json({ message: " error in edit patient" });
  }
};

const allDoctorDetails = async (req, res) => {
  const data = req.patient;
  try {
    // const doctors = await doctorModel.find();
    const patient = await patientModel.findOne({ _id: data._id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not Authorized" });
    }
    const doctors = await doctorModel.find();
    if (!doctors) {
      return res.status(404).json({ message: "doctor not found" });
    }
    return res.status(200).json({ message: "All Doctors", data: doctors });
  } catch (error) {
    return res.status(404).json({ message: " error in allDoctor" });
  }
};

const patientDetails = async (req, res) => {
  const data = req.patient;
  try {
    const patient = await patientModel
      .findOne({ _id: data._id })
      .populate("medicalHistory");
    if (!patient) {
      return res.status(404).json({ message: "Patient not Authorized" });
    }
    return res
      .status(200)
      .json({ message: "Patient Details", data: patient.medicalHistory });
  } catch (error) {
    return res.status(404).json({
      message: "  error in patient details for patient " + error,
    });
  }
};

module.exports = {
  registerPatient,
  loginPatient,
  patient,
  logoutPatient,
  AppointmentPatient,
  editpatient,
  allDoctorDetails,
  patientDetails,
};
