import Verify from "../module/VerifySchema.js";

export const getVerifyMarksForOneClass = async (req, res) => {
  try {
    const { standard, section } = req.params;
    const examType = decodeURIComponent(req.params.examType);

    console.log("DEBUG PARAMS:", standard, section, examType);

    if (!standard || !section || !examType) {
      return res.status(400).json({
        message: "standard, section, and examType are required",
      });
    }

    const oneClassMarks = await Verify.find({
      standard,
      section,
      examType,
    });

    if (!oneClassMarks.length) {
      return res.status(404).json({
        message: "No verified marks found for this class",
      });
    }

    return res.status(200).json({
      message: "Class marks fetched successfully",
      marks: oneClassMarks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
