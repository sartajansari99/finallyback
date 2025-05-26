import { Router } from "express";
import { markAttendance } from "../controllers/rfidLogic.controller.js";
const router = Router();
router.route("/rfidAttendence").post(markAttendance);

export default router;
