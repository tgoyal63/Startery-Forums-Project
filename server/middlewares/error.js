// Importing required modules
const { isDevEnvironment } = require("../config/config");
const logger = require("../utils/logger.utils");

/**
 * Error handling middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
module.exports = (err, req, res, next) => {
  // Set the status code to the error status or 500 if not provided
  const statusCode = err.statusCode || 500;

  // Set the error message to the error message or a default message if not provided
  const message = err.message || "An unexpected error occurred";

  // Set the error stack to the error stack or undefined if not provided
  const stack = err.stack || undefined;

  // Set the response status code and send the error message as JSON
  res.status(statusCode).send({
    statusCode,
    message,
    ...(isDevEnvironment && { stack }), // Include the error stack trace in the response in development mode
  });

  // Log the error details
  logger.error(
    `Status: ${statusCode}, Message: ${message}, Stack: ${err.stack}`
  );
};
