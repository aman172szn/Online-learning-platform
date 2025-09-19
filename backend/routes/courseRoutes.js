import express from "express";
const router = express.Router();
import {
  createCourse,
  getCourses, // <-- Import new functions
  getCourseById,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

// GET all courses, POST a new course
router.route("/").get(getCourses).post(protect, createCourse);
// GET a single course by its ID
// UPDATE
router.route("/:id").get(getCourseById);
router.route("/").post(protect, createCourse);

export default router;
