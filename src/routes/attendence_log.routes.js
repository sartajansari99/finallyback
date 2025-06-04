import express from "express";
const router = express.Router();
import { Attendence_log } from "../controllers/attendence_log.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.get("/attendance_log", verifyJWT, Attendence_log);

export default router;
