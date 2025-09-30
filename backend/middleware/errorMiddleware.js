// Handles requests to non-existent routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Catches all errors and sends a clean JSON response
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Note: Mongoose sends a CastError for bad ObjectIds
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// const errorHandler = (err, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let message = err.message;

//   // --- ADD THIS BLOCK TO CHECK FOR MONGOOSE VALIDATION ERROR ---
//   if (err.name === 'ValidationError') {
//     // Extract all the individual error messages
//     message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(', '); // Join them with a comma and space
//     statusCode = 400; // Set status to 400 for a bad request
//   }
//   // --- END OF NEW BLOCK ---

//   if (err.name === 'CastError' && err.kind === 'ObjectId') {
//     statusCode = 404;
//     message = 'Resource not found';
//   }

//   res.status(statusCode).json({
//     message: message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// };

export { notFound, errorHandler };
