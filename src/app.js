import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "https://frontend-eta-ivory-62.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

import userRouter from "./routes/user.routes.js";
import attendenceRoute from "./routes/attendence.routes.js";
import Attendance_logRoute from "./routes/attendence_log.routes.js";
import getusers from "./routes/getusers.routes.js";
import total_Attendance from "./routes/total_Attendence_Count.routes.js";
import subjectRoute from "./routes/subject.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", attendenceRoute);
app.use("/api/v1/admin", subjectRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin", Attendance_logRoute);
app.use("/api/v1/admin", getusers);
app.use("/api/v1/admin", total_Attendance);

export { app};
