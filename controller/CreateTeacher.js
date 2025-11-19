import Teacher from "../module/TeacherSchema.js";
import bcrypt from "bcryptjs";

// ===============================================
// ADD NEW TEACHER
// ===============================================
export const AddTeacher = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      department,
      designation,
      joiningDate,
      qualification,
      experience,
      loginId,
      password,
      AssignedClass,
      Salary
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
      department,
      designation,
      joiningDate,
      qualification,
      experience,
      loginId,
      password,
      AssignedClass,
      Salary
    };

    for (const key in required) {
      if (!required[key] || required[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // ---------------------------
    // Check email exists
    // ---------------------------
    const emailExist = await Teacher.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // ---------------------------
    // Check Login ID exists
    // ---------------------------
    const loginCheck = await Teacher.findOne({ loginId });
    if (loginCheck) {
      return res.status(409).json({ message: "Login ID already exists" });
    }

    // ---------------------------
    // Generate Teacher ID (NO DUPLICATE)
    // ---------------------------
    const lastTeacher = await Teacher.findOne().sort({ teacherId: -1 });

    let teacherId = "TCH-001";

    if (lastTeacher) {
      const lastNumber = parseInt(lastTeacher.teacherId.split("-")[1]);
      const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
      teacherId = `TCH-${nextNumber}`;
    }

    // ---------------------------
    // Hash password
    // ---------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------------------
    // Save data into DB
    // ---------------------------
    const newTeacher = new Teacher({
      teacherId,
      fullName,
      email,
      phone,
      address,
      gender,
      dob,
      department,
      designation,
      joiningDate,
      qualification,
      experience,
      loginId,
      password: hashedPassword,
      AssignedClass,
      Salary,
    });

    await newTeacher.save();

    return res.status(201).json({
      message: "Teacher added successfully",
      teacher: newTeacher,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// =======================================================
// DELETE ONE TEACHER
// =======================================================
export const deleteOneTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;

        if (!teacherId)
            return res.status(400).json({ message: "Teacher ID is required" });

        const result = await Teacher.findOneAndDelete({ teacherId });

        if (!result)
            return res.status(404).json({ message: "Teacher not found" });

        return res.status(200).json({
            message: "Teacher deleted successfully",
            deletedTeacher: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


// =======================================================
// GET ONE TEACHER BY TEACHER ID
// =======================================================
export const oneTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;

        if (!teacherId)
            return res.status(400).json({ message: "Teacher ID is required" });

        const teacher = await Teacher.findOne({ teacherId }) .select("-password -loginId -__v");;

        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });

        return res.status(200).json({
            message: "Teacher fetched successfully",
            teacher,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};