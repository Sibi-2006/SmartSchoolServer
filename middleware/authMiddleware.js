import jwt from "jsonwebtoken";
import Admin from "../module/Adminschema.js";
import Teacher from "../module/TeacherSchema.js";
import Student from "../module/StudentSchema.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export const teacherProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.teacher = await Teacher.findById(decoded.id).select("-password");

      if (!req.teacher) {
        return res.status(401).json({ message: "Teacher not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token verification failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};



export const studentProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.student = await Student.findById(decoded.id).select("-password");

      if (!req.student) {
        return res.status(401).json({ message: "Student not found" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token verification failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
