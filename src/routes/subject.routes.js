import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
const router = Router();
router.route("/createSubject").post(createSubject);
router.route("/getAllSubjects").post(getAllSubjects);
router.route("/updateSubject").post(updateSubject);
router.route("/deleteSubject").post(deleteSubject);

export default router;
