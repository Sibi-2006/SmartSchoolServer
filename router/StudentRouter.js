import express from "express"
import { addNewStudent, EditStudent } from "../controller/StudentController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addNew/student",protect,addNewStudent);
router.patch("/student/update/or/edit/:studentId",protect, EditStudent);
export default router;