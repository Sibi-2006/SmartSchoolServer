import Teacher from "../module/TeacherSchema.js";
import bcrypt from "bcryptjs";

export const AddTeacher = async (req, res) => {
    const {
        fullName,
        email,
        phone,
        address,
        gender,
        dob,
        department,
        designation,
        joiningDate,
        qualification,
        experience,
        loginId,
        password,
        AssignedClass,
        Salary
    } = req.body;

    // -------- VALIDATION -------- //
    const requiredFields = {
        fullName,
        email,
        phone,
        address,
        gender,
        dob,
        department,
        designation,
        joiningDate,
        qualification,
        experience,
        loginId,
        password,
        AssignedClass,
        Salary
    };

    for (const key in requiredFields) {
        if (!requiredFields[key]) {
            return res.status(400).json({
                message: `${key} is required`
            });
        }
    }

    try {
        // -------- UNIQUE TEACHER ID -------- //
        const count = await Teacher.countDocuments();
        const teacherId = `TCH-2025-0${count + 1}`;

        // -------- EMAIL CHECK -------- //
        const existingEmail = await Teacher.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // -------- LOGIN ID CHECK -------- //
        const existingLoginId = await Teacher.findOne({ loginId });
        if (existingLoginId) {
            return res.status(409).json({ message: "Login ID already exists" });
        }

        // -------- FIX GENDER CASE (OPTIONAL) -------- //
        const fixedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

        // -------- HASH PASSWORD -------- //
        const hashedPassword = await bcrypt.hash(password, 10);

        // -------- CREATE TEACHER OBJ ---- //
        const newTeacher = {
            fullName,
            email,
            phone,
            address,
            gender: fixedGender,  
            dob,
            teacherId,
            department,
            designation,
            joiningDate,
            qualification,
            experience,
            loginId,
            password: hashedPassword,  
            AssignedClass,             
            Salary                     
        };

        // -------- SAVE TO DATABASE -------- //
        await Teacher.create(newTeacher);

        return res.status(201).json({
            message: "Teacher added successfully",
            teacherId
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};
