import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
// 1. Import 'teacher' middleware
import { protect, teacher } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/upload/image
// 2. Add 'teacher' middleware to the route
router.post(
  "/image",
  protect,
  teacher,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "course_thumbnails", resource_type: "image" },
        (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Error uploading image" });
          }
          res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url,
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (err) {
      // 3. Fix the error response to be valid JSON
      res.status(500).json({ message: err.message || "Server Error" });
    }
  }
);

// @route   POST /api/upload/video
// 2. Add 'teacher' middleware to the route
router.post(
  "/video",
  protect,
  teacher,
  upload.single("video"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "course_videos", resource_type: "video" },
        (error, result) => {
          if (error) {
            // ... error handling
          }
          res.status(200).json({
            message: "Video uploaded successfully",
            videoUrl: result.secure_url,
            duration: result.duration, // <-- SEND BACK THE DURATION
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (err) {
      // 3. Fix the error response to be valid JSON
      res.status(500).json({ message: err.message || "Server Error" });
    }
  }
);

export default router;
