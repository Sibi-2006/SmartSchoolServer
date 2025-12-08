import Student from "../module/StudentSchema.js";
import Marks from "../module/MarksSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const studentLogin = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(404).json({ message: "Login ID and password are required" });
    }

    const student = await Student.findOne({ loginId });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: student._id, loginId: student.loginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student: { name: student.fullName, loginId: student.loginId },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get one student 
export const getOneStudent_ = async (req,res)=>{
  try{
    const { id } = req.params;
    if(!id) return res.status(404).json({message:"id is required"});

    const student = await Student.findById(id);
    if(!student) res.status(400).json({message:"student not fouded"});

    return res.status(200).json({message:"student found successful" , student:student});

  }catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//get one student all subject markes
export const getOneStudentMarks = async (req, res) => {
  try {
    const { studentId, examType } = req.params;
    if (!studentId || !examType) {
      return res.status(400).json({ message: "student-id and exam type is required" });
    }

    const marks = await Marks.find({ studentId, examType });

    if (marks.length === 0) {
      return res.status(404).json({ message: "No marks found for this student" });
    }

    return res.status(200).json({
      message: "Student marks fetched successfully",
      marks,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

