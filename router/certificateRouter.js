import express from "express";
import { getAllCertificate, requestCertificate , getOneCertificate, changeStatus, getCertificate_With_studentId} from "../controller/CertificateController.js";
import { parentProtect, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//parent
router.post("/add/cerificate-request",parentProtect,requestCertificate);
router.get("/get/one-student/all-certificates/:student_Id",parentProtect,getCertificate_With_studentId);
router.get("/get/one-certificate/for/parent/:id",parentProtect,getOneCertificate);
//admin
router.get("/get/all-certificates",protect,getAllCertificate);
router.get("/get/one-certificate/:id",protect,getOneCertificate);
router.patch("/update/status/:id",protect,changeStatus);
export default router;