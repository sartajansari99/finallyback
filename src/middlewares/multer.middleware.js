// src/middleware/multer.js (or wherever you have this multer code)

import multer from "multer";

// Detect if running on Render
const isRender = process.env.RENDER === "true";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (isRender) {
      cb(null, "/tmp"); // ✅ Writable on Render
    } else {
      cb(null, "./public/tmp"); // ✅ For local development
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to avoid overwrites
  }
});

export const upload = multer({ storage });
