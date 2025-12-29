import mongoose from "mongoose";

const ParentSchema = mongoose.Schema({
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
        loginId: {
        type: String,
        required: [true, "Login ID is required"],
        unique: true
        },
        password: {
        type: String,
        required: [true, "Password is required"]
        },
        secondPassword: {
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
)

export default mongoose.model("Parent",ParentSchema);