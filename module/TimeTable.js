import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  subject: String,
  teacher: String,
  startTime: String,
  endTime: String
});

const timeTableSchema = new mongoose.Schema({
  standard: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },

  days: {
    monday: [timeSlotSchema],
    tuesday: [timeSlotSchema],
    wednesday: [timeSlotSchema],
    thursday: [timeSlotSchema],
    friday: [timeSlotSchema],
    saturday: [timeSlotSchema]
  }
});

export default mongoose.model("TimeTable", timeTableSchema);
