import express from "express";
import { forget_password } from "../controller/forgetPasswordController.js";
const router = express.Router();

router.post("/for/:from",forget_password);


export default router;