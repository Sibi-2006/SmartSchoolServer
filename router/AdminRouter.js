import express from "express";
import Admin from "../module/Adminschema.js";
import Student from "../module/StudentSchema.js";
import Teacher from "../module/TeacherSchema.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";
import { ClassStats, deleteOneStudent, getAllDetails, getOneStudent, getStudentsByClass } from "../controller/allDetails.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.admin.name}`, admin: req.admin });
});

router.post("/login", async (req, res) => {
  const { loginId, password } = req.body;

  try {
    const admin = await Admin.findOne({ loginId });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, loginId: admin.loginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { name: admin.name, loginId: admin.loginId },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/getMax",protect,async(req,res)=>{
  try{
      const adminCount = await Admin.countDocuments();
      const teacherCount = await Teacher.countDocuments();
      const studentCount = await Student.countDocuments();

      const allCount = {
        adminCount,
        teacherCount,
        studentCount
      }
      if(!allCount) return res.status(404).json({message:"cant get max count from admin"})
      
      return res.status(200).json({message:"get max count from admin ", count:allCount});
  }catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/get/allDetails/from/:category",protect,getAllDetails);
//to get all class
router.get("/class-stats",protect, ClassStats);
//to get one student
router.get("/class/findOne/student/:studentId",protect,getOneStudent);
//to get all student in one class
router.get("/class/:standard/:section",protect,getStudentsByClass);
//to delete one student
router.delete("/delete/student/:studentId",protect,deleteOneStudent);


export default router;
