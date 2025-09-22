import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import cloudinary from "../config/cloudinary.js";

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
  const { name, semester, videoUrl, description, thumbnail, duration, topic } =
    req.body;

  const course = new Course({
    name,
    semester,
    topic,
    videoUrl,
    description,
    thumbnail,
    duration,
    user: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Teacher
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    // Check if the user is the owner of the course
    if (course.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this course");
    }

    course.name = req.body.name || course.name;
    course.semester = req.body.semester || course.semester;
    course.topic = req.body.topic || course.topic;
    course.description = req.body.description || course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Teacher
// const deleteCourse = asyncHandler(async (req, res) => {
//   const course = await Course.findById(req.params.id);

//   if (course) {
//     // Check if the user is the owner of the course
//     if (course.user.toString() !== req.user._id.toString()) {
//       res.status(401);
//       throw new Error("User not authorized to delete this course");
//     }

//     // --- NEW LOGIC TO DELETE FROM CLOUDINARY ---
//     try {
//       // 1. Extract Public IDs from the URLs
//       const thumbnailPublicId = course.thumbnail.split("/").pop().split(".")[0];
//       const videoPublicId = course.videoUrl.split("/").pop().split(".")[0];

//       // 2. Delete the files from Cloudinary
//       await cloudinary.uploader.destroy(
//         `course_thumbnails/${thumbnailPublicId}`,
//         { resource_type: "image" }
//       );
//       await cloudinary.uploader.destroy(`course_videos/${videoPublicId}`, {
//         resource_type: "video",
//       });
//     } catch (error) {
//       console.error("Error deleting files from Cloudinary:", error);
//       // Decide if you want to proceed with DB deletion even if file deletion fails
//     }

//     // 3. Delete the course from the database
//     await Course.deleteOne({ _id: course._id });
//     res.json({ message: "Course and associated files removed" });
//   } else {
//     res.status(404);
//     throw new Error("Course not found");
//   }
// });

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to delete this course");
    }

    try {
      const getPublicId = (url) => {
        const parts = url.split("/");
        const publicIdWithFolder = parts.slice(-2).join("/").split(".")[0];
        return publicIdWithFolder;
      };

      // --- ADD THIS CHECK for the thumbnail ---
      if (course.thumbnail && course.thumbnail.includes("cloudinary.com")) {
        const thumbnailPublicId = getPublicId(course.thumbnail);
        await cloudinary.uploader.destroy(thumbnailPublicId, {
          resource_type: "image",
        });
        console.log("Successfully deleted thumbnail from Cloudinary.");
      }

      // --- ADD THIS CHECK for the video ---
      if (course.videoUrl && course.videoUrl.includes("cloudinary.com")) {
        const videoPublicId = getPublicId(course.videoUrl);
        await cloudinary.uploader.destroy(videoPublicId, {
          resource_type: "video",
        });
        console.log("Successfully deleted video from Cloudinary.");
      }
    } catch (error) {
      console.error("Error during Cloudinary file deletion:", error);
    }

    await Course.deleteOne({ _id: course._id });
    res.json({ message: "Course removed" });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});
export { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
