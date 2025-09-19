import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile, // <-- Import new functions
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authmiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);

// Define the protected route for the user profile
router
  .route("/profile")
  .get(protect, getUserProfile) // GET request is protected
  .put(protect, updateUserProfile); // PUT request is protected

export default router;
