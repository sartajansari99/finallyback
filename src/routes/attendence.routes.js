import { Router } from "express";
import { rfidLogic } from "../controllers/rfidLogic.controller.js";
const router = Router();
router.route("/rfidAttendence").post(rfidLogic);

export default router;
