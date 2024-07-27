const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "name must be at least 3 characters" })
    .max(50, { message: "name must be at most 50 characters" }),
  specialization: z
    .string({ required_error: "Specialization is required" })
    .min(2, { message: "specialization must be at least 2 characters" })
    .max(50, { message: "specialization must be at most 50 characters" }),
  yearsOfExperience: z
    .string({
      required_error: "Year of experience is required",
    })
    .min(1, { message: "Year of experience is required" }),
  department: z
    .string({ required_error: "Department is required" })
    .min(2, { message: "Department must be at least 2 characters" })
    .max(50, { message: "Department must be at most 50 characters" }),
  mobileNumber: z
    .string({ required_error: "Mobile Number is required" })
    .min(7, { message: "Mobile Number must be at least 7 characters" })
    .max(10, { message: "Mobile Number must be at most 10 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});

const loginSchema = z.object({
  mobileNumber: z
    .string({ required_error: "Mobile Number is required" })
    .min(7, { message: "Mobile Number must be at least 7 characters" })
    .max(10, { message: "Mobile Number must be at most 10 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});

module.exports = { signupSchema, loginSchema };
