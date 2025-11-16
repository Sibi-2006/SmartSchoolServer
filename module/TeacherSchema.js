import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
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
        enum: ["Male", "Female", "Other", "male", "female", "other"],
        required: true
    },

    dob: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    loginId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    AssignedClass: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Teacher", TeacherSchema);
