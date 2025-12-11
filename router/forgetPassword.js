import express from "express";
import { forget_password, sentOTP } from "../controller/forgetPasswordController.js";
const router = express.Router();

router.post("/for/:from",forget_password);
router.post("/sent-otp",sentOTP);


export default router;