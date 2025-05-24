import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  registerAdmin,
  refreshAccessToken,
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerAdmin
);

router.route("/login").post(loginAdmin);

//secured routes
router.route("/logout").post(verifyJWT, logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);
export default router;
