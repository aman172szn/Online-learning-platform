import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // We'll store duration in seconds
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
