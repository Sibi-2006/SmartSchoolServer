import express from "express";
import { protect,teacherProtect} from "../middleware/authMiddleware.js"
import { getVerifyMarksForOneClass } from "../controller/verifyController.js";
const router = express.Router();


router.get("/teacher/:standard/:section/:examType",teacherProtect,getVerifyMarksForOneClass);
router.get("/admin/:standard/:section/:examType",protect,getVerifyMarksForOneClass)

export default router;