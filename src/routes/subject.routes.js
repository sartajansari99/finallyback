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
router.route("/updateSubject:id").put(updateSubject);
router.route("/deleteSubject:id").delete(deleteSubject);

export default router;
