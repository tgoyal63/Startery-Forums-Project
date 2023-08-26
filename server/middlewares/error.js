/**
 * Error handling middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
module.exports = (err, req, res, next) => {
  // Set the status code to the error status or 500 if not provided
  const statusCode = err.status || 500;

  // Set the error message to the error message or a default message if not provided
  const errorMessage = err.message || "An unexpected error occurred";

  // Set the response status code and send the error message as JSON
  res.status(statusCode).send({
    message: errorMessage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include the error stack trace in the response in development mode
  });

  // Log the error details
  logger.error(
    `Status: ${statusCode}, Message: ${errorMessage}, Stack: ${err.stack}`
  );
};
