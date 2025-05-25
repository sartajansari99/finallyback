import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
  myname
} from "../controllers/subject.controllers.js";
const router = Router();
router.route("/createSubject").post(createSubject);
router.route("/getAllSubjects").get(getAllSubjects);
router.route("/updateSubject").post(updateSubject);
router.route("/deleteSubject").post(deleteSubject);
router.route("/deleteSubject").get(myname);

export default router;
