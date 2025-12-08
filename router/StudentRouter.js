import express from "express"
import { addNewStudent, EditStudent } from "../controller/StudentController.js";
import { protect, studentProtect } from "../middleware/authMiddleware.js";
import { getOneStudent_, getOneStudentMarks, studentLogin } from "../controller/Student.js"
import { getOneStudentAttendance } from "../controller/AttendanceController.js";
import { getOneClassTimeTable } from "../controller/TimeTableController.js";
const router = express.Router();

router.post("/addNew/student",protect,addNewStudent);
router.patch("/student/update/or/edit/:studentId",protect, EditStudent);
//from student
router.get("/dashboard", studentProtect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.student.fullName}`, student: req.student });
});
router.post("/login",studentLogin);
router.get("/get/student/:id",studentProtect,getOneStudent_);
router.get("/marks/:studentId/:examType",studentProtect,getOneStudentMarks);
router.get("/one-student/:section/:standard/:studentId",studentProtect,getOneStudentAttendance);
router.get("/oneClass/:standard/:section",studentProtect,getOneClassTimeTable);


export default router;