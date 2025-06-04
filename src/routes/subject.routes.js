import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
const router = Router();
router.route("/createSubject").post(createSubject);
router.route("/getAllSubjects").get(verifyJWT,getAllSubjects);
router.route("/updateSubject/:id").put(updateSubject);
router.route("/deleteSubject/:id").delete(deleteSubject);

export default router;
