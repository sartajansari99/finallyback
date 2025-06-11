import express from "express";
const router = express.Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getUserById,
} from "../controllers/getusers.controller.js";

router.get("/getalluser", getAllUsers);
router.get("/getuserbyid", getUserById);

export default router;
