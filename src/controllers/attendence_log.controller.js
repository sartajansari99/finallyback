import { Attendance } from "../models/attendence.models.js";
import moment from "moment";

async function Attendence_log(req, res) {
  try {
    const logs = await Attendance.find()
      .populate("student")
      .populate("subject")
      .sort({ timestamp: -1 });

    const formattedLogs = logs.map((entry) => ({
      fullName: entry.student ? entry.student.fullName : "Unknown Student",
      avatar: entry.student?.avatar || "uploads/default.png",
      semester: entry.student ? entry.student.semester : "N/A",
      subject: entry.subject ? entry.subject.name : "Unknown Subject",
      subjectCode: entry.subject ? entry.subject.code : "N/A",
      date: moment(entry.timestamp).format("YYYY-MM-DD"),
      day: moment(entry.timestamp).format("dddd"),
      time: moment(entry.timestamp).format("hh:mm A"),
    }));

    res.json(formattedLogs);
  } catch (error) {
    console.error("Error fetching attendance log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { Attendence_log };
