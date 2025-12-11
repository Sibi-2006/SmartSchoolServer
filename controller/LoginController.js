import Teacher from "../module/TeacherSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const teacherLogin = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password)
      return res.status(400).json({ message: "All fields are required" });

    const teacher = await Teacher.findOne({ loginId });
    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // create token
    const token = jwt.sign(
      { id: teacher._id, loginId: teacher.loginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      teacher: {
        id: teacher._id,
        loginId: teacher.loginId,
        fullName: teacher.fullName,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

