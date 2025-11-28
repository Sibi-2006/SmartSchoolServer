import express from "express";
import Attendance from "../module/AttendanceSchema.js";
import { teacherProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher marks attendance
router.post("/mark", teacherProtect, async (req, res) => {
    try {
        const { date, standard, section, students, subject} = req.body;


        const required ={
            date, standard, section, students, subject
        }

        for (const key in required) {
            if (!required[key] || required[key].toString().trim() === "") {
                return res.status(400).json({ message: `${key} is required` });
            }
            }
        // Prevent duplicate attendance
        const exists = await Attendance.findOne({
            date,
            standard,
            section,
        });

        if (exists) {
            return res.status(400).json({
                message: "Attendance already marked for this class today",
            });
        }

        // Save
        const newAttendance = await Attendance.create({
            date,
            standard,
            section,
            subject: subject || null,
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

export default router;
