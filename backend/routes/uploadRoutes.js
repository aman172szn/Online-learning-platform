// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// // Configure Multer's storage engine
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/"); // Files will be saved in the 'uploads' folder
//   },
//   filename(req, file, cb) {
//     // Set the filename to be unique to avoid overwriting
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// // Function to check that the file is an image
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Images only!"));
//   }
// }

// // Initialize the upload middleware
// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// // Define the upload endpoint. 'image' is the name of the form field.
// router.post("/", upload.single("image"), (req, res) => {
//   res.send({
//     message: "Image Uploaded",
//     image: `/${req.file.path}`,
//   });
// });

// export default router;

import express from "express";
import multer from "multer";
import { protect, teacher } from "../middleware/authMiddleware.js";
const router = express.Router();

// Multer will still process the file in memory, but we won't send it anywhere
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/upload/image
// @desc    MOCK endpoint for thumbnail upload
// @access  Private
router.post(
  "/image",
  protect,
  teacher,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Instead of uploading, just send a success response with a fake URL
    res.status(200).json({
      message: "Mock image upload successful",
      imageUrl: "/uploads/mock-image.jpg",
    });
  }
);

// @route   POST /api/upload/video
// @desc    MOCK endpoint for video upload
// @access  Private
router.post(
  "/video",
  protect,
  teacher,
  upload.single("video"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Instead of uploading, just send a success response with a fake URL
    res.status(200).json({
      message: "Mock video upload successful",
      videoUrl: "/uploads/mock-video.mp4",
    });
  }
);

export default router;
