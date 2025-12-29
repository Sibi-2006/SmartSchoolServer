import express from "express";
import { loginParent, verifyMarks } from "../controller/parentController.js";
import { parentProtect } from "../middleware/authMiddleware.js";
import { getOneStudent } from "../controller/allDetails.js";
import { getOneStudent_, getOneStudentMarks } from "../controller/Student.js";
import { getOneStudentAttendance } from "../controller/AttendanceController.js";
import { getOneClassTimeTable } from "../controller/TimeTableController.js";

const router = express.Router();

router.post("/login",loginParent);
router.get("/dashboard", parentProtect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.parent.fullName}`, parent: req.parent });
});
router.post("/verify",parentProtect,verifyMarks);
router.get("/get-student/:studentId",parentProtect,getOneStudent);
router.get("/get/student/:id",parentProtect,getOneStudent_);
router.get("/marks/:studentId/:examType",parentProtect,getOneStudentMarks);
router.get("/one-student/:section/:standard/:studentId",parentProtect,getOneStudentAttendance);
router.get("/oneClass/:standard/:section",parentProtect,getOneClassTimeTable);


export default router;