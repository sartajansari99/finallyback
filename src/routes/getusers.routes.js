import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById,
} from "../controllers/getusers.controller.js";

router.get("/getalluser", getAllUsers);
router.get("/getuserbyid", getUserById);

export default router;
