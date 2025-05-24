// routes/attendanceRoutes.js

import express from "express";
const router = express.Router();
import { getAttendanceCountBySubject  }from "../controllers/getTotal_attendence.controller.js"

router.get('/attendance_by_subject', getAttendanceCountBySubject );

export default router;
