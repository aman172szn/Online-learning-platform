import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/uploadRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

// Load environment variables
dotenv.config();

// Connect to the database
console.log("MONGO_URI from env:", process.env.MONGO_URI);
connectDB();
console.log("After connectDB call");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// A simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve(); // <-- Add this line
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
