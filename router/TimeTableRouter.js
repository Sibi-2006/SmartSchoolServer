import express from "express";
import { addTimeTable, getAllStandardSection, getOneClassTimeTable } from "../controller/TimeTableController.js";
import {protect , studentProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-new/for/:standard/:section",protect,addTimeTable);
router.get("/oneClass/:standard/:section",studentProtect,getOneClassTimeTable);
router.get("/oneClass/from-admin/:standard/:section",protect,getOneClassTimeTable);
router.get("/get/all/time-table",protect,getAllStandardSection);

export default router;