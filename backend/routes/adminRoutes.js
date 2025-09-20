import express from "express";
const router = express.Router();
import {
  getUsers,
  promoteUserToTeacher,
  demoteUserFromTeacher,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// These routes are protected by both 'protect' (logged in) and 'admin' (is an admin)
router.route("/users").get(protect, admin, getUsers);
router.route("/users/:id/promote").put(protect, admin, promoteUserToTeacher);
router.route("/users/:id/demote").put(protect, admin, demoteUserFromTeacher);

export default router;
