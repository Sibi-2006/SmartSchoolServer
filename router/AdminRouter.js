import express from "express";
import Admin from "../module/Adminschema.js";
import Student from "../module/StudentSchema.js";
import Teacher from "../module/TeacherSchema.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";
import { ClassStats, deleteOneStudent, getAllDetails, getOneStudent, getStudentsByClass } from "../controller/allDetails.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.admin.fullName}`, admin: req.admin });
});

router.post("/login", async (req, res) => {
  const { loginId, password } = req.body;

  try {
    const admin = await Admin.findOne({ loginId });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

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
router.post("/addnew/admin", protect, async (req, res) => {
  try {
    const { userName, email, password, loginId } = req.body;

    // Validation
    const isValid = { userName, email, password, loginId };

    for (const key in isValid) {
      if (!isValid[key] || isValid[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // Check email exists in Admin collection
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Generate Admin ID
const lastAdmin = await Admin.findOne().sort({ adminId: -1 });

let adminId = "ADM-ID-001";

if (lastAdmin && lastAdmin.adminId) {
    const parts = lastAdmin.adminId.split("-"); 
    const lastNumber = parseInt(parts[2]);      
    const nextNumber = (lastNumber + 1).toString().padStart(3, "0");
    adminId = `ADM-ID-${nextNumber}`;
}


    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const newAdmin = await Admin.create({
      userName,
      email,
      password: hashedPassword,
      loginId,
      adminId,
    });

    return res.status(201).json({
      message: "Admin successfully created",
    });

  } catch (err) {
    console.log(err);
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
