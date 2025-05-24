import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  semester: {
    type: Number,
    required: true,
  },
  startTime: String,
  endTime: String,
  day: String,
});

export const Subject = mongoose.model("Subject", subjectSchema);
