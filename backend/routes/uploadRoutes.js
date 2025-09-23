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
            duration: result.duration,
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ message: err.message || "Server Error" });
    }
  }
);

export default router;

// import express from "express";
// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";
// import { protect, teacher } from "../middleware/authMiddleware.js";

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // This route now has detailed logging
// router.post(
//   "/image",
//   protect,
//   teacher,
//   upload.single("image"),
//   async (req, res) => {
//     console.log("--- HIT /api/upload/image ENDPOINT ---");
//     try {
//       if (!req.file) {
//         console.log("Validation failed: No file uploaded.");
//         return res.status(400).json({ message: "No image file uploaded" });
//       }
//       console.log(
//         `File received: ${req.file.originalname}, Size: ${req.file.size}`
//       );

//       console.log("Attempting to upload to Cloudinary...");
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: "course_thumbnails", resource_type: "image" },
//         (error, result) => {
//           if (error) {
//             console.error("--- CLOUDINARY UPLOAD FAILED ---");
//             console.error(error);
//             return res.status(500).json({ message: "Cloudinary upload error" });
//           }

//           console.log("--- CLOUDINARY UPLOAD SUCCESS ---");
//           res.status(200).json({
//             message: "Image uploaded successfully",
//             imageUrl: result.secure_url,
//           });
//         }
//       );

//       console.log("Sending file buffer to Cloudinary stream...");
//       uploadStream.end(req.file.buffer);
//     } catch (err) {
//       console.error("--- CATCH BLOCK ERROR ---");
//       console.error(err);
//       res
//         .status(500)
//         .json({ message: err.message || "Server Error in catch block" });
//     }
//   }
// );

// // Add the same logging to the video route for future testing
// router.post(
//   "/video",
//   protect,
//   teacher,
//   upload.single("video"),
//   async (req, res) => {
//     console.log("--- HIT /api/upload/video ENDPOINT ---");
//     try {
//       if (!req.file) {
//         console.log("Validation failed: No file uploaded.");
//         return res.status(400).json({ message: "No video file uploaded" });
//       }
//       console.log(
//         `File received: ${req.file.originalname}, Size: ${req.file.size}`
//       );

//       console.log("Attempting to upload video to Cloudinary...");
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: "course_videos", resource_type: "video" },
//         (error, result) => {
//           if (error) {
//             console.error("--- CLOUDINARY VIDEO UPLOAD FAILED ---");
//             console.error(error);
//             return res
//               .status(500)
//               .json({ message: "Cloudinary video upload error" });
//           }

//           console.log("--- CLOUDINARY VIDEO UPLOAD SUCCESS ---");
//           res.status(200).json({
//             message: "Video uploaded successfully",
//             videoUrl: result.secure_url,
//             duration: result.duration,
//           });
//         }
//       );

//       console.log("Sending video buffer to Cloudinary stream...");
//       uploadStream.end(req.file.buffer);
//     } catch (err) {
//       console.error("--- CATCH BLOCK ERROR (VIDEO) ---");
//       console.error(err);
//       res
//         .status(500)
//         .json({ message: err.message || "Server Error in video catch block" });
//     }
//   }
// );

// export default router;
