import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  timestamp: { type: Date, default: Date.now },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
