import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    // Basic Details
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    address: {
      type: String,
      required: [true, "Address is required"]
    },
    
    gender: {
      type: String,
      enum: ["Male", "Female", "Other" , "male" , "female" , "other"],
      required: [true, "Gender is required"]
    },
    dob: {
      type: String,
      required: [true, "Date of Birth is required"]
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"]
    },

    // Academic Details
    standard: {
      type: String,
      required: [true, "Standard is required"]
    },
    section: {
      type: String,
      required: [true, "Section is required"]
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true
    },
    admissionDate: {
      type: String,
      required: [true, "Admission date is required"]
    },

    // Parent Details
    fatherName: {
      type: String,
      required: [true, "Father name is required"]
    },
    fatherPhone: {
      type: String
    },
    fatherOccupation: {
      type: String
    },

    motherName: {
      type: String,
      required: [true, "Mother name is required"]
    },
    motherPhone: {
      type: String
    },
    motherOccupation: {
      type: String
    },

    GuardianName: {
      type: String
    },
    GuardianPhone: {
      type: String
    },
    GuardianOccupation: {
      type: String
    },

    // Fee Details
    totalFees: {
      type: Number,
      default: 0
    },
    amountPaid: {
      type: Number,
      default: 0
    },
    balance: {
        type: Number,
        default: function () {
            return this.totalFees - this.amountPaid;
        }
        },


    // Student Login
    loginId: {
      type: String,
      required: [true, "Login ID is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    studentId:{
        type: String,
        required: true,
        unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", StudentSchema);
