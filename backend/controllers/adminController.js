import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Promote user to teacher
// @route   PUT /api/admin/users/:id/promote
// @access  Private/Admin
const promoteUserToTeacher = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isTeacher = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const demoteUserFromTeacher = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isTeacher = false;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUsers, promoteUserToTeacher, demoteUserFromTeacher };
