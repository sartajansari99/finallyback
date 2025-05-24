import { Subject } from "../models/subject.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const createSubject = asyncHandler(async (req, res) => {
  try {
    const { name, code, semester, startTime, endTime, day } = req.body;
    
    if (!name || !code || !semester || !startTime || !endTime || !day) {
      throw new ApiError(404, "all field required");
    }

    const newSubject = new Subject({
      name,
      code,
      semester,
      startTime,
      endTime,
      day,
    });
    console.log(newSubject);
    const savedSubject = await newSubject.save();
    res.status(201).json({
      message: "Subject saved successfully",
      subject: savedSubject,
    });
  } catch (err) {
    console.error("Error saving subject:", err);
    res.status(500).json({ message: "Server error" });
  }
});
const getAllSubjects = asyncHandler(async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subjects", error });
  }
});

const updateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ message: "Subject updated", subject });
  } catch (error) {
    res.status(500).json({ message: "Failed to update subject", error });
  }
});

const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subject", error });
  }
});

export { createSubject, getAllSubjects, updateSubject, deleteSubject };
