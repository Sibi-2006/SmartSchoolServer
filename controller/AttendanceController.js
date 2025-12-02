import Attendance from "../module/AttendanceSchema.js";
import mongoose from "mongoose";

export const getOneStudentAttendance = async (req, res) => {
  try {
    const { section, standard, studentId } = req.params;

    if (!section || !standard || !studentId) {
      return res.status(400).json({
        message: "section, standard, and student-id are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Query MongoDB directly for the student attendance
    const attendanceRecords = await Attendance.find(
      { section, standard, "students.studentId": studentId },
      { date: 1, subject: 1, markedBy: 1, "students.$": 1 } // $ returns only matched student
    ).populate("markedBy", "fullName").populate("students.studentId", "fullName");

    if (attendanceRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this student" });
    }

    return res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendanceRecords,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
