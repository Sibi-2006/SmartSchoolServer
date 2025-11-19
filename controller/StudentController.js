import Student from "../module/StudentSchema.js";
import bcrypt from "bcryptjs";

// ===============================================
// ADD NEW STUDENT
// ===============================================
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
    // Generate Student ID (NO DUPLICATE)
    // ---------------------------
    const lastStudent = await Student.findOne().sort({ studentId: -1 });

    let studentId = "STD-001";

    if (lastStudent) {
      const lastNumber = parseInt(lastStudent.studentId.split("-")[1]);
      const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
      studentId = `STD-${nextNumber}`;
    }

    // ---------------------------
    // Hash password
    // ---------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------------------
    // Save data into DB
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




// ===============================================
// EDIT STUDENT
// ===============================================

export const EditStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

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
    } = req.body;

    // ---------------------------
    // Required validation
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
      totalFees,
      amountPaid,
    };

    for (const key in required) {
      if (!required[key] || required[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // ---------------------------
    // Email exists check except current student
    // ---------------------------
    const emailExist = await Student.findOne({
      email: email,
      studentId: { $ne: studentId },
    });

    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // ---------------------------
    // Update student by custom studentId
    // ---------------------------
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId }, // find by custom ID
      {
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
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Student updated successfully", student: updatedStudent });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
