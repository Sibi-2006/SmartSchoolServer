import express from "express"
import { addNewStudent } from "../controller/StudentController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addNew/student",protect,addNewStudent);
export default router;