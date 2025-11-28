import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
     date: {
    type: String,      
    required: true
  },

  standard: {
    type: String,      
    required: true
  },

  section: {
    type: String,     
    required: true
  },

  subject: {
    type: String,     
    default: null
  },

  markedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Teacher",
    default: null
  },

  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rollNumber: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ["present", "absent"],
        required: true
      }
    }
  ]
});

export default mongoose.model("Attendance", AttendanceSchema);
