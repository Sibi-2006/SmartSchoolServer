import express from "express"
import { addNewStudent, EditStudent } from "../controller/StudentController.js";
import { protect, studentProtect } from "../middleware/authMiddleware.js";
import { getOneStudent, getOneStudentMarks, studentLogin } from "../controller/Student.js"
const router = express.Router();

router.post("/addNew/student",protect,addNewStudent);
router.patch("/student/update/or/edit/:studentId",protect, EditStudent);
//from student
router.get("/dashboard", studentProtect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.student.fullName}`, student: req.student });
});
router.post("/login",studentLogin);
router.get("/get/student/:id",studentProtect,getOneStudent);
router.get("/marks/:studentId/:examType",studentProtect,getOneStudentMarks);
export default router;