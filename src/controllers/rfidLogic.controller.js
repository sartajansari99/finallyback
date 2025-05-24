import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from "../models/attendence.models.js";

const rfidLogic = asyncHandler(async (req, res) => {
  try {
    const { rfid } = req.body;
    const student = await User.findOne({ rfid });

    if (!student) throw new ApiError(404, "student not found!");
    console.log("Student info:", student);

    const now = moment();
    const currentDay = now.format("dddd");
    const currentTime = now.format("HH:mm");

    console.log("Current Day:", currentDay);
    console.log("studentname:", student.name);
    console.log("Current Time:", currentTime);

    const subject = await User.findOne({
      semester: student.semester,
      day: currentDay,
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    });

    if (!subject) throw new ApiError(404, "subject not found");

    const attendance = new Attendance({
      student: student._id,
      subject: subject._id,
      timestamp: new Date(),
    });

    await attendance.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sartaansari121sa@gmail.com",
        pass: "tvkv pdtw pkor hmzh",
      },
    });

    const mailOptions = {
      from: "sartaansari121sa@gmail.com",
      to: student.parentEmail,
      subject: `Attendance Marked for ${student.name}`,
      html: `
        <p>Dear Parent,</p>
        <p>Your child <strong>${
          student.name
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
      .status(201)
      .json(
        new ApiResponse(
          200,
          mailOptions,
          "Attendance marked and email sent to parent"
        )
      );
  } catch (error) {
    console.error("❌ Error marking attendance:", error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});
export { rfidLogic };
