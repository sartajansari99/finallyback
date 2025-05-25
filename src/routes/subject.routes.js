import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
const router = Router();
router.route("/createSubject").post(createSubject);
router.route("/getAllSubjects").get(getAllSubjects);
router.route("/updateSubject:id").post(updateSubject);
router.route("/deleteSubject:id").post(deleteSubject);

export default router;
