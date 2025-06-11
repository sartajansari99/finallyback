import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createSubject").post(verifyJWT, createSubject);
router.route("/getAllSubjects").get(verifyJWT, getAllSubjects);
router.route("/updateSubject/:id").put(verifyJWT, updateSubject);
router.route("/deleteSubject/:id").delete(verifyJWT, deleteSubject);

export default router;
