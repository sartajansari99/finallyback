import { Router } from "express";
import { markAttendance } from "../controllers/rfidLogic.controller.mjs";
const router = Router();
router.route("/rfidAttendence").post(markAttendance);

export default router;
