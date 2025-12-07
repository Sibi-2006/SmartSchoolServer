import Teacher from "../module/TeacherSchema.js";
import Student from "../module/StudentSchema.js";

export const checkMoney = async (req, res) => {
  try {
    //  Total Teacher Salary
    const teachers = await Teacher.find({}, { Salary: 1 });

    if (!teachers.length)
      return res.status(404).json({ message: "No teacher salary data" });

    let totalSalary = 0;
    teachers.forEach(t => {
      totalSalary += Number(t.Salary || 0);
    });

    //  Student Fees Summary
    const students = await Student.find({}, { totalFees: 1, amountPaid: 1, balance: 1 });

    if (!students.length)
      return res.status(404).json({ message: "No student fee data" });

    let totalFees = 0;
    let amountPaid = 0;
    let balance = 0;

    students.forEach(s => {
      totalFees += Number(s.totalFees || 0);
      amountPaid += Number(s.amountPaid || 0);
      balance += Number(s.balance || 0);
    });

    //  Return Result
    return res.json({
      teacher: { totalSalary },
      student: { totalFees, amountPaid, balance }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
