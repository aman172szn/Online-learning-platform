import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

// --- ADD THESE NEW FUNCTIONS ---

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
// @desc    Fetch courses based on user role and filters
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
  // Start with an empty filter object
  const filter = {};

  // If a semester is provided in the query string (e.g., /api/courses?semester=2), add it to the filter
  if (req.query.semester) {
    filter.semester = req.query.semester;
  }

  // Check if the logged-in user is a teacher
  if (req.user.isTeacher) {
    // If they are a teacher, add a filter to only find their own courses
    filter.user = req.user._id;
  }

  // Use the final filter object to find courses
  const courses = await Course.find(filter);

  res.json(courses);
});

// @desc    Fetch a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// --- KEEP THE EXISTING FUNCTION ---

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
  // Use 'name', 'semester', etc. to match the model and frontend
  const { name, semester, videoUrl, description, thumbnail } = req.body;

  const course = new Course({
    name,
    semester, // <-- Use 'semester' here
    videoUrl,
    description,
    thumbnail,
    user: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

export { createCourse, getCourses, getCourseById };
