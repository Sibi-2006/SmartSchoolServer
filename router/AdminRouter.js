import express from "express";
import Admin from "../module/Adminschema.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected dashboard route
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.admin.name}`, admin: req.admin });
});

// ✅ Admin login route
router.post("/login", async (req, res) => {
  const { adminId, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, adminId: admin.adminId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { name: admin.name, adminId: admin.adminId },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
