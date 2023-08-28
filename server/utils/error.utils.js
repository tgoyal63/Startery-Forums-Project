const {SERVER_ERROR} = require("../config/httpStatusCodes");

/**
 * BaseError class that extends built-in Error class.
 * It provides basic structure for all other error classes.
 */
class BaseError extends Error {
  /**
   * @param {string} name - The name of the error.
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} description - The description of the error.
   * @param {boolean} isOperational - Flag to indicate if the error is operational.
   */
  constructor(name, statusCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

/**
 * APIError class that extends BaseError class.
 * It provides structure for API related errors.
 */
class APIError extends BaseError {
  /**
   * @param {string} name - The name of the error.
   * @param {number} [statusCode=500] - The HTTP status code of the error. Default is 500.
   * @param {boolean} [isOperational=true] - Flag to indicate if the error is operational. Default is true.
   * @param {string} [description="internal server error"] - The description of the error. Default is "internal server error".
   */
  constructor(
    name,
    statusCode = SERVER_ERROR.INTERNAL_SERVER_ERROR,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, statusCode, description, isOperational);
  }
}

// Exporting the classes and objects for external use.
module.exports = {
  BaseError,
  APIError,
};
