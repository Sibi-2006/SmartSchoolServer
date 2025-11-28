import express from "express";
import { addmark } from "../controller/marksController.js";
import { teacherProtect } from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/from/teacher/:studentId",teacherProtect,addmark)
export default router;
