import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
    loginId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true
    },
    adminId:{
        type: String,
        required: true,
        unique: true
    },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
