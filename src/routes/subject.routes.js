import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
const router = Router();
router.route("/createSubject").post(createSubject);

export default router;
