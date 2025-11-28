import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100, 
    },

    examType: {
      type: String,
      enum: ["Unit Test 1", "Unit Test 2", "Midterm", "Final", "Monthly", "Special"],
      required: true,
    },

    maxMarks: {
      type: Number,
      default: 100,
    },

    standard: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Marks", MarksSchema);
