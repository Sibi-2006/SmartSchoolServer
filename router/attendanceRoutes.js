import express from "express";
import Attendance from "../module/AttendanceSchema.js";
import { teacherProtect } from "../middleware/authMiddleware.js";
import { getOneStudentAttendance } from "../controller/AttendanceController.js";
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



router.get("/one-student/:section/:standard/:studentId",studentProtect,getOneStudentAttendance);

export default router;
