import express from "express";
import { AddTeacher, deleteOneTeacher, editOneTeacher, oneTeacher } from "../controller/CreateTeacher.js";
import { protect , teacherProtect } from "../middleware/authMiddleware.js";
import { teacherLogin } from "../controller/LoginController.js";

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

//from teacher
router.post("/teacher/login",teacherLogin);
export default router;