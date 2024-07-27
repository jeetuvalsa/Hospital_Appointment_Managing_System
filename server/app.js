require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const doctorRoute = require("./routers/doctorRoute");
const patientRoute = require("./routers/patientRoute");
const connectDB = require("./utils/db");

const doctorModel = require("./models/doctorModel");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: [process.env.FORNTEND_URL_ONE, process.env.FORNTEND_URL_TWO], // Replace with your frontend's URL
    credentials: true, // If you need to send cookies or HTTP auth headers
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/patient", patientRoute);

const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Connected to 3000 port");
  });
});
