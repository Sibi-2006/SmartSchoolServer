import express from "express";
import Attendance from "../module/AttendanceSchema.js";
import { parentProtect, protect, teacherProtect } from "../middleware/authMiddleware.js";
import { getOneStudentAttendance, getOneStudentAttendancePercentage } from "../controller/AttendanceController.js";
import { studentProtect } from "../middleware/authMiddleware.js"
const router = express.Router();

// Teacher marks attendance
// Teacher marks attendance
router.post("/mark", teacherProtect, async (req, res) => {
    try {
        const { date, standard, section, students, subject } = req.body;

        // Validate
        if (!date || !standard || !section || !students || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Prevent duplicate for same teacher & subject
        const exists = await Attendance.findOne({
            date,
            standard,
            section,
            subject,
            markedBy: req.teacher._id
        });

        if (exists) {
            return res.status(400).json({
                message: "You have already marked attendance for this class/subject today",
            });
        }

        // Save
        const newAttendance = await Attendance.create({
            date,
            standard,
            section,
            subject,
            markedBy: req.teacher._id,
            students,
        });

        res.status(201).json({
            message: "Attendance saved successfully",
            data: newAttendance,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// /attendance/one-student/${section}/${standard}/${id}/${from}`

router.get("/one-student/:section/:standard/:studentId/student",studentProtect,getOneStudentAttendance);
router.get("/one-student/:section/:standard/:studentId/teacher",teacherProtect,getOneStudentAttendance);
router.get("/one-student/:section/:standard/:studentId/parent",parentProtect,getOneStudentAttendance);
router.get("/one-student/:section/:standard/:studentId/admin",protect,getOneStudentAttendance);

router.get("/one-student/percentage/:section/:standard/:studentId/teacher",teacherProtect,getOneStudentAttendancePercentage);
router.get("/one-student/percentage/:section/:standard/:studentId/admin",protect,getOneStudentAttendancePercentage);





export default router;
