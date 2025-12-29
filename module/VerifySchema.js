import mongoose from "mongoose";

const VerifySchema = new mongoose.Schema(
  {
    student_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
result: {
      type: String,
      required: [true, "result is required"],
      trim: true,
    },
    standard: {
      type: String,
      required: [true, "Standard is required"],
    },

    section: {
      type: String,
      required: [true, "Section is required"],
    },

    examType: {
      type: String,
      enum: [
        "Unit Test 1",
        "Unit Test 2",
        "Midterm",
        "Final",
        "Monthly",
        "Special",
      ],
      required: true,
      index: true,
    },

  },
  { timestamps: true }
);

VerifySchema.index(
  { student_Id: 1, examType: 1 },
  { unique: true }
);

export default mongoose.model("Verify", VerifySchema);
