const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const patientModel = require("../models/patientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("../models/postModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerDoctor = async (req, res) => {
  const {
    name,
    specialization,
    yearsOfExperience,
    department,
    mobileNumber,
    password,
  } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "Doctor_Profile",
  });
  try {
    const existDoctor = await doctorModel.findOne({ mobileNumber });
    if (existDoctor) {
      return result
        .status(400)
        .json({ message: "Entered Doctor details already exists" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).json({ message: "Error in Bcrypt", err });
      const newDoctor = await doctorModel.create({
        name,
        specialization,
        yearsOfExperience,
        department,
        password: hash,
        mobileNumber,
        image: result.url,
      });
      await fs.unlinkSync(req.file.path);
      if (!newDoctor) {
        return res.status(500).json({ message: "Failed to register doctor" });
      }
      return res
        .status(200)
        .json({ message: "Doctor Created Successfully", data: newDoctor });
    });
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "error in registerDoctor catch block" });
  }
};
const loginDoctor = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const doctor = await doctorModel.findOne({ mobileNumber });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    bcrypt.compare(password, doctor.password, async (error, result) => {
      if (error) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      if (result) {
        const token = await jwt.sign(
          { doctorId: doctor._id, mobileNumber: doctor.mobileNumber },
          process.env.JWT_SECRET_KEY
        );
        res.cookie("token", token);
        return res
          .status(200)
          .json({ message: "Doctor Logged In Successfully", data: doctor });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "error in loginDoctor catch block" });
  }
};
const doctor = async (req, res) => {
  try {
    const data = req.doctor;
    return res.status(200).json({ message: "Doctor Data", data });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in doctor catch block", error });
  }
};
const logoutDoctor = async (req, res) => {
  try {
    res.cookie("token", "");
    return res.status(200).json({ message: "Doctor Log Out Successfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in loginDoctor catch block", error });
  }
};

const allAppointments = async (req, res) => {
  const data = req.doctor;
  try {
    const doctor = await doctorModel
      .findOne({ _id: data._id })
      .populate("appointedPatients")
      .populate("completedPatients");
    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    return res.status(200).json({
      message: "all appointments",
      data: doctor.appointedPatients,
      completed: doctor.completedPatients,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in all Appointments catch block", error });
  }
};

const changeStatus = async (req, res) => {
  const { appointmentId, status } = req.params;
  const data = req.doctor;
  try {
    const appointment = await appointmentModel.findOne({ _id: appointmentId });
    if (status == "completed") {
      const doctor = await doctorModel.findOne({ _id: data._id });
      if (!doctor) {
        return res.status(404).json({ message: "doctor not found" });
      }
      doctor.completedPatients.push(appointment._id);
      doctor.appointedPatients.pull({ _id: appointment._id });
      await doctor.save();
    }
    appointment.status = status;
    await appointment.save();
    return res.status(200).json({ message: "Changed Status" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error in change status block", error });
  }
};
const editDoctor = async (req, res) => {
  const data = req.doctor;
  const {
    name,
    specialization,
    yearsOfExperience,
    department,
    mobileNumber,
    password,
  } = req.body;
  try {
    const doctor = await doctorModel.findOne({ _id: data._id });
    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Doctor_Profile",
    });
    bcrypt.hash(password, 10, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ message: "Error in Edit password", err });
      }
      doctor.name = name;
      doctor.image = result.url;
      doctor.specialization = specialization;
      doctor.yearsOfExperience = yearsOfExperience;
      doctor.department = department;
      doctor.mobileNumber = mobileNumber;
      doctor.password = hashed;
      await doctor.save();
      return res
        .status(200)
        .json({ message: "Successfully updated the profile", data: doctor });
    });
  } catch (error) {
    return res.status(404).json({ message: " error in edit" });
  }
};
const allDoctor = async (req, res) => {
  const data = req.doctor;
  try {
    // const doctors = await doctorModel.find();
    const doctors = await doctorModel.find({ _id: { $ne: data._id } });
    if (!doctors) {
      return res.status(404).json({ message: "doctor not found" });
    }
    return res.status(200).json({ message: "All Doctors", data: doctors });
  } catch (error) {
    return res.status(404).json({ message: " error in allDoctor" });
  }
};

const removeAppointment = async (req, res) => {
  const { appointId } = req.params;
  try {
    const appointment = await appointmentModel.findByIdAndDelete(appointId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res
      .status(200)
      .json({ message: "Appointment removed successfully" });
  } catch (error) {
    return res.status(404).json({ message: " error in remove appointment" });
  }
};

const allPatients = async (req, res) => {
  try {
    const patients = await patientModel.find().populate("medicalHistory");
    if (!patients) {
      return res.status(404).json({ message: "No patients found" });
    }
    return res.status(200).json({ message: "All Patients", data: patients });
  } catch (error) {
    return res.status(404).json({ message: " error in allPatients", error });
  }
};

const particularPatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await patientModel
      .findById(patientId)
      .populate("medicalHistory");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res
      .status(200)
      .json({ message: "Particular Patient", data: patient });
  } catch (error) {
    return res
      .status(404)
      .json({ message: " error in particularPatient", error });
  }
};

const createPost = async (req, res) => {
  const doctorData = req.doctor;
  const { PatientId } = req.params;
  const { description } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Patient_Posts",
    });
    const patient = await patientModel.findOne({ _id: PatientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const newPost = await postModel.create({
      doctorImage: doctorData.image,
      doctorName: doctorData.name,
      doctorSpecialization: doctorData.specialization,
      doctorDepartment: doctorData.department,
      description,
      patient: patient._id,
      image: result.url,
    });
    await newPost.save();
    if (!newPost) {
      return res.status(404).json({ message: "Error in creating post" });
    }
    patient.medicalHistory.push(newPost._id);
    await patient.save();
    return res.status(200).json({ message: "Successfully created post" });
  } catch (error) {
    return res.status(404).json({ message: " error in createPost", error });
  }
};
const removePatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await patientModel.findOneAndDelete({ _id: patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ message: "Patient Remove Successfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in removing patient", error });
  }
};
const removePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postModel.findOneAndDelete({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post removed successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Error in removing post " + error });
  }
};

module.exports = {
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
};
