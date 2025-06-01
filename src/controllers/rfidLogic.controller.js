import { User } from "../models/user.model.js";
import { Subject } from "../models/subject.model.js";
import { Attendance } from "../models/attendence.models.js";
import moment from "moment-timezone";
import nodemailer from "nodemailer";

const markAttendance = async (req, res) => {
  try {
    const { rfid } = req.body;
    const student = await User.findOne({ rfid });

    if (!student) return res.status(404).json({ message: "Student not found" });
    console.log("Student info:", student);

    const now = moment().tz("Asia/Kolkata");
    const currentDay = now.format("dddd");
    const currentTime = now.format("HH:mm");

    console.log("Current Day:", currentDay);
    console.log("studentname:", student.fullName);
    console.log("Current Time:", currentTime);

    const subject = await Subject.findOne({
      semester: student.semester,
      day: currentDay,
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    });

    if (!subject)
      return res.status(404).json({ message: "No subject at this time" });

    // 🔒 Check for duplicate attendance
    const existingAttendance = await Attendance.findOne({
      student: student._id,
      subject: subject._id,
      timestamp: {
        $gte: moment().tz("Asia/Kolkata").startOf("day").toDate(),
        $lte: moment().tz("Asia/Kolkata").endOf("day").toDate(),
      },
    });

    if (existingAttendance) {
      return res
        .status(409)
        .json({ message: "Attendance already marked for this subject today" });
    }

    const attendance = new Attendance({
      student: student._id,
      subject: subject._id,
      timestamp: now.toDate(),
    });

    await attendance.save();
    res.status(200).json({ message: "Attendance marked successfully" });

    // ✅ Send Email to Parent
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use your own SMTP settings
      auth: {
        user: "sartaansari121sa@gmail.com", // ✅ Replace with your email
        pass: "tvkv pdtw pkor hmzh", // ✅ Replace with app-specific password
      },
    });

    const mailOptions = {
      from: "sartaansari121sa@gmail.com",
      to: student.parentEmail,
      subject: `Attendance Marked for ${student.fullName}`,
      html: `
        <p>Dear Parent,</p>
        <p>Your child <strong>${
          student.fullName
        }</strong> has marked attendance for the subject <strong>${
          subject.name
        } subject code ${subject.code}</strong> at <strong>${now.format(
          "hh:mm A"
        )}</strong> on <strong>${now.format("dddd, MMMM Do YYYY")}</strong>.</p>
        <p>Regards,<br/>Smart Attendance System</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Attendance marked and email sent to parent" });
  } catch (error) {
    console.error("❌ Error marking attendance:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { markAttendance };