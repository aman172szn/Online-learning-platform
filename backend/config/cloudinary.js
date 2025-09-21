import { v2 as cloudinary } from "cloudinary";

// Cloudinary API FIX 
import dotenv from "dotenv";
dotenv.config();

// --- DEBUGGING LOGS ---
console.log("--- Loading Cloudinary Config ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "Loaded" : "NOT LOADED"
);
console.log("---------------------------------");
// --- END DEBUGGING ---

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
