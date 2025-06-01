import {Attendance} from "../models/attendence.models.js";

const getAttendanceCountBySubject = async (req, res) => {
  try {
    const result = await Attendance.aggregate([
      {
        $group: {
          _id: "$subject",
          totalAttendance: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "_id",
          as: "subjectDetails",
        },
      },
      {
        $unwind: "$subjectDetails",
      },
      {
        $project: {
          subjectId: "$_id",
          subjectName: "$subjectDetails.name",
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
