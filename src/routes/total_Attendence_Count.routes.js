import express from "express";
const router = express.Router();
import { getAttendanceCountBySubject  }from "../controllers/getTotal_attendence.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.get('/attendance_by_subject',verifyJWT,getAttendanceCountBySubject );

export default router;
