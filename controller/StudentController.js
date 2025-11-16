import Student from "../module/StudentSchema.js";
import bcrypt from "bcryptjs";

export const addNewStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      bloodGroup,
      standard,
      section,
      rollNumber,
      admissionDate,
      fatherName,
      motherName,
      fatherPhone,
      motherPhone,
      GuardianName,
      GuardianPhone,
      motherOccupation,
      fatherOccupation,
      GuardianOccupation,
      totalFees,
      amountPaid,
      loginId,
      password
    } = req.body;

    // ---------------------------
    // Validate required fields
    // ---------------------------
    const required = {
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      bloodGroup,
      standard,
      section,
      rollNumber,
      admissionDate,
      fatherName,
      motherName,
      loginId,
      password,
      totalFees,
      amountPaid,
    };

    for (const key in required) {
      if (!required[key] || required[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // ---------------------------
    // Check email exists
    // ---------------------------
    const emailExist = await Student.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // ---------------------------
    // Generate Student ID
    // ---------------------------
    const count = await Student.countDocuments();
    const studentId = `STD-${String(count + 1).padStart(3, "0")}`;

    // ---------------------------
    // Hash password
    // ---------------------------
    const hashedPassword = await bcrypt.hash(password, 10);
    // ---------------------------
    // Save data into database
    // ---------------------------
    const newStudent = new Student({
      studentId,
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      bloodGroup,
      standard,
      section,
      rollNumber,
      admissionDate,
      fatherName,
      motherName,
      fatherPhone,
      motherPhone,
      GuardianName,
      GuardianPhone,
      motherOccupation,
      fatherOccupation,
      GuardianOccupation,
      totalFees,
      amountPaid,
      loginId,
      password: hashedPassword,
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
