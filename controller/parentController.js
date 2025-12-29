import Parent from "../module/ParentSchema.js";
import Student from "../module/StudentSchema.js";
import bcrypt from "bcryptjs";
import Verify from "../module/VerifySchema.js"
import jwt from "jsonwebtoken";

export const createParent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      studentId,
      loginId,
      password,
      secondPassword
    } = req.body;

    // required check
    const required = {
      fullName,
      email,
      phone,
      studentId,
      loginId,
      password,
      secondPassword,
    };

    for (const key in required) {
      if (!required[key] || required[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // check student exists
    const findStudent = await Student.findOne({ studentId });
    if (!findStudent)
      return res.status(404).json({ message: "invalid student-id" });

    // check parent already created for this student
    const findParent = await Parent.findOne({ studentId });
    if (findParent)
      return res
        .status(409)
        .json({ message: "this student already has a parent login" });

    // check email
    const emailExist = await Parent.findOne({ email });
    if (emailExist)
      return res.status(409).json({ message: "email already exists" });

    // check loginId
    const loginIdExist = await Parent.findOne({ loginId });
    if (loginIdExist)
      return res.status(409).json({ message: "login-id already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const secondhashedPassword = await bcrypt.hash(secondPassword,10);
    // create parent
    const newParent = new Parent({
      fullName,
      email,
      phone,
      studentId,
      loginId,
      password: hashedPassword,
      secondPassword:secondhashedPassword
    });

    await newParent.save();

    // remove password before sending response
    const parentData = newParent.toObject();
    delete parentData.password;

    return res.status(201).json({
      message: "parent added successfully",
      parent: parentData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// login for parent
export const loginParent = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password)
      return res.status(400).json({ message: "login-id and password are required" });

    const parent = await Parent.findOne({ loginId });
    if (!parent)
      return res.status(400).json({ message: "Invalid login-id" });

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: parent._id, loginId: parent.loginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      parent: { fullName: parent.fullName, loginId: parent.loginId },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const verifyMarks = async (req, res) => {
  try {
    const {
      studentId,
      student_Id,
      fullName,
      standard,
      section,
      examType,
      result,
      secondPassword,
    } = req.body;

    /* ================= VALIDATION ================= */
    const required = {
      studentId,
      student_Id,
      fullName,
      standard,
      section,
      examType,
      result,
      secondPassword,
    };

    for (const key in required) {
      if (!required[key] || required[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }
    const isExist = await Verify.findOne({ student_Id, examType });

    if (isExist) {
      return res
        .status(409)
        .json({ message: "Marks already verified" });
    }


    /* ================= AUTH PARENT ================= */
    const parent = await Parent.findOne({ studentId });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    if (parent.studentId !== studentId) {
      return res.status(403).json({ message: "Unauthorized student access" });
    }

    /* ================= PASSWORD CHECK ================= */
    const isMatch = await bcrypt.compare(
      secondPassword,
      parent.secondPassword
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid second password" });
    }

    /* ================= DUPLICATE CHECK ================= */
    const alreadyVerified = await Verify.findOne({
      student_Id,
      examType,
    });

    if (alreadyVerified) {
      return res.status(409).json({
        message: "Marks already verified for this exam",
      });
    }

    /* ================= SAVE ================= */
    const newVerify = new Verify({
      student_Id,
      fullName,
      standard,
      section,
      examType,
      result,
    });

    await newVerify.save();

    return res.status(200).json({
      message: "Marks verified successfully",
      verify: newVerify,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};