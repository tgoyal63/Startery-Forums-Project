const { SERVER_ERROR } = require("../config/httpStatusCodes");

/**
 * BaseError class that extends built-in Error class.
 * It provides basic structure for all other error classes.
 */
class BaseError extends Error {
  /**
   * @param {string} name - The name of the error.
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} message - The error message.
   * @param {boolean} isOperational - Flag to indicate if the error is operational.
   */
  constructor(name, statusCode, message, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

/**
 * CustomError class that extends BaseError class.
 * It provides structure for API related errors.
 */
class CustomError extends BaseError {
  /**
   * @param {string} name - The name of the error.
   * @param {number} [statusCode=500] - The HTTP status code of the error. Default is 500.
   * @param {string} [message="internal server error"] - The error message. Default is "internal server error".
   * @param {boolean} [isOperational=true] - Flag to indicate if the error is operational. Default is true.
   */
  constructor(
    name,
    statusCode = SERVER_ERROR.INTERNAL_SERVER_ERROR,
    message = "internal server error",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}

// Exporting the classes and objects for external use.
module.exports = {
  BaseError,
  CustomError,
};
