import TimeTable from "../module/TimeTable.js";

export const addTimeTable = async (req, res) => {
  try {
    const { standard, section } = req.params;
    const { day, subject, teacher, startTime, endTime } = req.body;

    if (!day || !subject || !teacher || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate day
    const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    if (!validDays.includes(day.toLowerCase())) {
      return res.status(400).json({ message: "Invalid day" });
    }

    // Check if timetable exists for class-section
    let timetable = await TimeTable.findOne({ standard, section });

    // If not exists, create empty
    if (!timetable) {
      timetable = new TimeTable({
        standard,
        section,
        days: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: []
        }
      });
    }

    // Add new entry to the specific day
    timetable.days[day.toLowerCase()].push({
      subject,
      teacher,
      startTime,
      endTime
    });

    await timetable.save();

    return res.status(200).json({
      message: "Timetable updated successfully",
      timetable
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// get one class time table
export const getOneClassTimeTable = async (req, res) => {
  try {
    const { standard, section } = req.params;

    if (!standard || !section) {
      return res.status(400).json({ message: "Standard and section are required" });
    }

    const timetable = await TimeTable.findOne({ standard, section });

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found for this class" });
    }

    return res.status(200).json({
      message: "Timetable found",
      timetable,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

//get all time table only standard, section
export const getAllStandardSection = async (req, res) => {
  try {
    const timeTable = await TimeTable.find();

    if (!timeTable || timeTable.length === 0) {
      return res.status(404).json({ message: "No standard & section found" });
    }

    // Extract only standard & section
    const AllStandardSection = timeTable.map((tt) => ({
      standard: tt.standard,
      section: tt.section
    }));

    return res.status(200).json({
      message: "Standard & section fetched successfully",
      AllStandardSection,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
