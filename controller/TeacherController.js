import Teacher from "../module/TeacherSchema.js";
import Student from "../module/StudentSchema.js";
export const getOneTeacherClass = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const teacher = await Teacher.findOne({ teacherId: teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Cannot find teacher" });
    }

    const assignedClass = teacher.AssignedClass;

    if (!assignedClass) {
      return res
        .status(404)
        .json({ message: "No class assigned to this teacher" });
    }

    return res.status(200).json({
      message: "Class fetched successfully",
      class: assignedClass,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const TotalBoysandGirls = async (req, res) => {
  try {
    const { standard, section } = req.params;

    if (!standard || !section) {
      return res
        .status(400)
        .json({ message: "Standard and section are required" });
    }

    // Case-insensitive match
    const totalBoys = await Student.countDocuments({
      standard,
      section,
      gender: { $regex: /^male$/i },
    });

    const totalGirls = await Student.countDocuments({
      standard,
      section,
      gender: { $regex: /^female$/i },
    });

    return res.status(200).json({
      standard,
      section,
      totalBoys,
      totalGirls,
      totalStudents: totalBoys + totalGirls,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
