import express from "express";
import { AddTeacher, deleteOneTeacher, oneTeacher } from "../controller/CreateTeacher.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/teacher", protect ,AddTeacher);
router.delete("/delete/teacher/byId/:teacherId",protect, deleteOneTeacher);
router.get("/getOneTeache/teacher/byId/:teacherId",protect, oneTeacher)
export default router;