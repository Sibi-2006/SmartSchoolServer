import express from "express";
import { AddTeacher, deleteOneTeacher, editOneTeacher, oneTeacher } from "../controller/CreateTeacher.js";
import { protect , teacherProtect } from "../middleware/authMiddleware.js";
import { teacherLogin } from "../controller/LoginController.js";
import { editeTeacher, getOneTeacherClass, TotalBoysandGirls } from "../controller/TeacherController.js";
import { getStudentsByClass } from "../controller/allDetails.js";

const router = express.Router();
// ---------- TEACHER DASHBOARD (Protected) ----------
router.get("/dashboard", teacherProtect, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.teacher.fullName}`,
    teacher: req.teacher
  });
});
//from Admin
router.post("/teacher", protect ,AddTeacher);
router.delete("/delete/teacher/byId/:teacherId",protect, deleteOneTeacher);
router.get("/getOneTeache/teacher/byId/:teacherId",protect, oneTeacher);
router.patch("/getOneTeacher/byId/:teacherId",protect,editOneTeacher);

// Teacher side
router.post("/teacher/login", teacherLogin);
router.get("/get/classFor/teacher/:teacherId", teacherProtect, getOneTeacherClass);
router.get("/teacher/total-gender/:standard/:section", teacherProtect, TotalBoysandGirls);
router.get("/getOneTeacher/by-Id/:teacherId",teacherProtect, oneTeacher);
router.get("/class/:standard/:section",teacherProtect,getStudentsByClass);
router.patch("/update/teacher/:id",teacherProtect,editeTeacher);

export default router;