import { Attendance } from "../models/attendence.models.js";

const getAttendanceCountBySubject = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      {
        $group: {
          _id: {
            subject: "$subject",
            user: "$student",
          },
          totalAttendance: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id.subject",
          foreignField: "_id",
          as: "subjectDetails",
        },
      },
      {
        $unwind: "$subjectDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          subjectId: "$_id.subject",
          subjectName: "$subjectDetails.name",
          userId: "$_id.user",
          fullName: "$userDetails.fullName",
          rfid: "$userDetails.rfid",
          totalAttendance: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching attendance count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAttendanceCountBySubject };
