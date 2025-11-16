import express from "express";
import { AddTeacher } from "../controller/CreateTeacher.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/teacher", protect ,AddTeacher);
export default router;