import Admin from "../module/Adminschema.js";
import Student from "../module/StudentSchema.js";
import Teacher from "../module/TeacherSchema.js";

export const getAllDetails = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    let Model;

    if (category === "admin") Model = Admin;
    if (category === "teacher") Model = Teacher;
    if (category === "student") Model = Student;

    if (!Model) {
        return res.status(400).json({ message: "Invalid category" });
    }

    try {
        // SECURE: Do NOT send loginId, password, __v to frontend
        const data = await Model.find().select("-password -loginId -__v");

        if (data.length === 0) {
            return res.status(404).json({ message: `No ${category} data found` });
        }

        return res.status(200).json({
            message: `Successfully fetched ${category} data`,
            userData: data
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
 export const ClassStats = async (req,res)=>{
    try {
        const stats = await Student.aggregate([
            {
            $group: {
                _id: { standard: "$standard", section: "$section" },
                boys: { $sum: { 
                $cond: [
                    { $eq: [ { $toLower: { $ifNull: ["$gender", ""] } }, "male" ] }, 1, 0
                ]
                }},
                girls: { $sum: { 
                $cond: [
                    { $eq: [ { $toLower: { $ifNull: ["$gender", ""] } }, "female" ] }, 1, 0
                ]
                }},
                total: { $sum: 1 }
            }
            }

        ]);

        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 }
export const getStudentsByClass = async (req, res) => {
  try {
    const { standard, section } = req.params;

    if (!standard || !section) {
      return res.status(400).json({ message: "Standard and section are required" });
    }

    const students = await Student.find({ standard, section })
      .select("-password -loginId -__v"); // ⬅ hide these fields

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json(students);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getOneStudent = async(req,res)=>{
    try{
        const { studentId } = req.params;
        if(!studentId){
            return res.status(400).json({ message: "student ID  are required" });
        }
        const findStudent = await Student.findOne({ studentId }).select("-password -loginId -__v");
        if(!findStudent){
            return res.status(404).json({ message: "No students found" });
        }
        res.status(200).json({message:"found student" , student:findStudent});
    }catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
// Delete one student
export const deleteOneStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const deletedStudent = await Student.findOneAndDelete({ studentId });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
