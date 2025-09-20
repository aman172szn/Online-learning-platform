import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
} from "../controllers/courseController.js";
import { protect, teacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// This single block handles both GET and POST requests to the root '/'
router
  .route("/")
  .get(protect, getCourses) // GET /api/courses (Protected for all logged-in users)
  .post(protect, teacher, createCourse); // POST /api/courses (Protected for Teachers only)

// This handles requests for a single course by its ID
router.route("/:id").get(getCourseById); // GET /api/courses/:id (Public)

export default router;
